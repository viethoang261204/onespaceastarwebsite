import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, BookOpen, Users, Calendar, Layers } from "lucide-react";

const T = {
  bg: "#F4EFE6",
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  accent: "#B85C38",
  accentDark: "#8F3F22",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
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
  if (!ok) return "wrong-location";
  return "ok";
}

export default function DashboardTab({ state, conflicts, availViolations, wrongAssignments }) {
  const { teachers, assignments, schedules } = state;

  const scheduledAssignments = new Set(schedules.map((s) => s.assignmentId));
  const unassigned = assignments.filter((a) => !a.teacher);
  const assigned = assignments.filter((a) => a.teacher);

  const teacherByName = {};
  teachers.forEach((t) => { teacherByName[t.name] = t; });

  const wrongCapCount = wrongAssignments.filter((a) => {
    const s = getAssignmentStatus(a, teacherByName);
    return s === "wrong-subject" || s === "wrong-location";
  }).length;

  const statCards = [
    {
      icon: <Users size={20} color={T.teal} />,
      value: teachers.length,
      label: "Tổng số giáo viên",
      bg: T.tealLight,
    },
    {
      icon: <BookOpen size={20} color={T.amber} />,
      value: assignments.length,
      label: "Số môn cần phân công",
      bg: T.amberLight,
    },
    {
      icon: <Layers size={20} color={T.sage} />,
      value: `${assigned.length}/${assignments.length}`,
      label: "Đã phân giáo viên",
      bg: T.sageLight,
    },
    {
      icon: <Calendar size={20} color={T.accent} />,
      value: `${scheduledAssignments.size}/${assignments.filter((a) => a.teacher).length}`,
      label: "Đã xếp thời khóa biểu",
      bg: "#F4E3D4",
    },
  ];

  const alertCards = [
    {
      id: "missing",
      icon: <AlertTriangle size={18} color={T.danger} />,
      title: "Lớp chưa có giáo viên",
      count: unassigned.length,
      items: unassigned.slice(0, 6).map((a) => ({
        label: `${a.program} · Lớp ${a.grade} · ${a.subject}`,
        sub: a.hinhthuc,
      })),
      borderColor: T.danger,
      bg: T.dangerLight,
    },
    {
      id: "wrong-cap",
      icon: <XCircle size={18} color={T.amber} />,
      title: "GV chưa đủ năng lực dạy môn được giao",
      count: wrongCapCount,
      items: wrongAssignments
        .filter((a) => {
          const s = getAssignmentStatus(a, teacherByName);
          return s === "wrong-subject" || s === "wrong-location";
        })
        .slice(0, 6)
        .map((a) => ({
          label: `${a.program} · Lớp ${a.grade} · ${a.subject}`,
          sub: a.teacher || "(chưa phân)",
        })),
      borderColor: T.amber,
      bg: T.amberLight,
    },
    {
      id: "conflict",
      icon: <XCircle size={18} color={T.danger} />,
      title: "Xung đột giờ dạy của giáo viên",
      count: conflicts.length,
      items: conflicts.slice(0, 6).flatMap((group) =>
        group.map((g) => ({
          label: `${g.assignment.hinhthuc} · ${g.schedule.day} ${g.schedule.slot}`,
          sub: g.assignment.teacher,
        }))
      ),
      borderColor: T.danger,
      bg: T.dangerLight,
    },
    {
      id: "avail",
      icon: <AlertTriangle size={18} color={T.amber} />,
      title: "GV không rảnh slot đã xếp",
      count: availViolations.length,
      items: availViolations.slice(0, 6).map((v) => ({
        label: `${v.assignment.hinhthuc} · ${v.schedule.day} ${v.schedule.slot}`,
        sub: v.assignment.teacher,
      })),
      borderColor: T.amber,
      bg: T.amberLight,
    },
  ];

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {card.label}
              </span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: T.ink, fontFamily: "'Fraunces', serif", lineHeight: 1 }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Alert cards grid 2×2 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
        {alertCards.map((card) => (
          <AlertCard key={card.id} card={card} />
        ))}
      </div>

      {/* Quick guide */}
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: "24px",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 18,
            fontWeight: 600,
            color: T.ink,
            marginBottom: 20,
          }}
        >
          Hướng dẫn nhanh
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              num: "1",
              title: "Phân công giáo viên",
              desc: "Vào tab Phân công, gán giáo viên phù hợp cho từng môn-lớp dựa trên năng lực và cơ sở.",
            },
            {
              num: "2",
              title: "Khai báo lịch rảnh",
              desc: "Vào tab Giáo viên, cập nhật lịch rảnh của từng giáo viên để hệ thống phát hiện xung đột.",
            },
            {
              num: "3",
              title: "Xếp thời khóa biểu",
              desc: "Vào tab Thời khóa biểu, chọn lớp đã phân GV và xếp vào slot phù hợp trong tuần.",
            },
          ].map((step) => (
            <div key={step.num} style={{ display: "flex", gap: 14 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: T.accent,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.inkSoft, marginBottom: 4 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            background: T.surfaceAlt,
            borderRadius: 8,
            fontSize: 13,
            color: T.muted,
          }}
        >
          💡 Nhớ xuất file JSON định kỳ để backup dữ liệu. Vào menu{" "}
          <strong style={{ color: T.inkSoft }}>Dữ liệu</strong> bên trên để xuất/nhập.
        </div>
      </div>
    </div>
  );
}

function AlertCard({ card }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        background: card.bg,
        border: `1px solid ${card.borderColor}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {card.icon}
          <span style={{ fontSize: 13, fontWeight: 600, color: card.borderColor }}>
            {card.title}
          </span>
        </div>
        <div
          style={{
            background: card.borderColor,
            color: "#fff",
            borderRadius: 20,
            padding: "2px 10px",
            fontSize: 12,
            fontWeight: 700,
            minWidth: 28,
            textAlign: "center",
          }}
        >
          {card.count}
        </div>
      </div>

      {open && card.count > 0 && (
        <div style={{ borderTop: `1px solid ${card.borderColor}`, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          {card.items.map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{item.sub}</div>
            </div>
          ))}
          {card.count > card.items.length && (
            <div style={{ fontSize: 12, color: T.muted, fontStyle: "italic" }}>
              + {card.count - card.items.length} mục khác...
            </div>
          )}
        </div>
      )}

      {open && card.count === 0 && (
        <div style={{ borderTop: `1px solid ${card.borderColor}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 8, color: T.sage, fontSize: 13 }}>
          <CheckCircle size={16} color={T.sage} />
          Không có vấn đề — mọi thứ ổn
        </div>
      )}
    </div>
  );
}
