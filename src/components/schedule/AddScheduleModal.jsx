import { X } from "lucide-react";
import { useState } from "react";
import { getEligibleTeachers } from "../../lib/validators";

const T = {
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
};

function getAssignmentStatus(a, teacherByName) {
  if (!a.teacher) return "missing";
  const t = teacherByName[a.teacher];
  if (!t) return "missing";
  const can = !!t?.subjects?.[a.program]?.[a.subject];
  if (!can) return "wrong-subject";
  const L = t?.locations;
  if (!L) return "missing";
  let ok = false;
  if (a.hinhthuc.includes("Times City")) ok = !!L["Times City"];
  else if (a.hinhthuc.includes("Smart City")) ok = !!L["Smart City"];
  else if (a.hinhthuc.includes("Online")) ok = !!L["Online"];
  else if (a.hinhthuc.includes("Tại nhà") || a.hinhthuc.includes("nhà")) ok = !!L["Tại nhà"];
  return ok ? "ok" : "wrong-location";
}

export default function AddScheduleModal({
  day,
  slot,
  assignments,
  teachers,
  schedules,
  conflictMap,
  violationSet,
  onConfirm,
  onClose,
}) {
  const teacherByName = {};
  teachers.forEach((t) => { teacherByName[t.name] = t; });

  // Build sorted list
  const items = assignments.map((a) => {
    const teacher = teacherByName[a.teacher];
    const alreadyScheduled = schedules.some((s) => s.assignmentId === a.id);
    const hasConflict = (conflictMap[`${a.teacher}|${day}|${slot}`] || 0) > 1;
    const avViolation = !alreadyScheduled && violationSet.has(a.id);

    let status = "ok";
    if (alreadyScheduled) status = "scheduled";
    else if (hasConflict) status = "conflict";
    else if (avViolation) status = "avail-vio";
    else status = getAssignmentStatus(a, teacherByName);

    return { assignment: a, teacher, status };
  });

  // Sort: ok first, then avail-vio, then conflict, then scheduled
  const order = { ok: 0, "avail-vio": 1, conflict: 1, "scheduled": 2, missing: 3 };
  items.sort((a, b) => (order[a.status] || 99) - (order[b.status] || 99));

  const grouped = {
    ok: items.filter((i) => i.status === "ok"),
    warn: items.filter((i) => i.status === "avail-vio" || i.status === "conflict"),
    done: items.filter((i) => i.status === "scheduled"),
  };

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: T.surface,
          borderRadius: 16,
          width: "100%",
          maxWidth: 480,
          maxHeight: "85vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Fraunces', serif" }}>
              Xếp lớp vào TKB
            </div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
              {day} · {slot}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", color: T.muted }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
          {assignments.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: T.muted, fontSize: 13 }}>
              Không có lớp nào được phân giáo viên.
            </div>
          )}

          {grouped.ok.length > 0 && (
            <Group title={`GV rảnh — ${grouped.ok.length} lớp`} color={T.sage} bg={T.sageLight} items={grouped.ok} onConfirm={onConfirm} day={day} slot={slot} schedules={schedules} />
          )}

          {grouped.warn.length > 0 && (
            <Group title={`Cảnh báo — ${grouped.warn.length} lớp`} color={T.amber} bg={T.amberLight} items={grouped.warn} onConfirm={onConfirm} day={day} slot={slot} schedules={schedules} />
          )}

          {grouped.done.length > 0 && (
            <Group title={`Đã xếp lịch khác — ${grouped.done.length} lớp`} color={T.teal} bg={T.tealLight} items={grouped.done} onConfirm={onConfirm} day={day} slot={slot} schedules={schedules} disabled />
          )}
        </div>
      </div>
    </Overlay>
  );
}

function Group({ title, color, bg, items, onConfirm, day, slot, schedules, disabled }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: bg,
          border: `1px solid ${color}`,
          borderRadius: 8,
          cursor: disabled ? "default" : "pointer",
          marginBottom: open ? 6 : 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {title}
        </span>
      </div>
      {open && items.map(({ assignment: a, teacher, status }) => {
        const alreadyInSlot = schedules.some((s) => s.assignmentId === a.id && s.day === day && s.slot === slot);
        const statusLabel = {
          ok: "GV rảnh",
          "avail-vio": "GV không rảnh",
          conflict: "GV trùng giờ",
          scheduled: "Đã xếp lịch khác",
        }[status] || "";
        return (
          <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: `1px solid ${T.border}`, gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{a.subject} · Lớp {a.grade}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{teacher?.name} · {a.hinhthuc}</div>
              {statusLabel && status !== "ok" && (
                <div style={{ fontSize: 11, color: T.amber, marginTop: 2 }}>{statusLabel}</div>
              )}
            </div>
            {!alreadyInSlot && !disabled && (
              <button
                onClick={() => onConfirm(a.id)}
                style={{
                  padding: "5px 12px",
                  background: T.teal,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Chọn
              </button>
            )}
            {alreadyInSlot && (
              <span style={{ fontSize: 11, color: T.sage, fontWeight: 600 }}>Đã xếp</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16 }}
      onClick={onClose}
    >
      {children}
    </div>
  );
}
