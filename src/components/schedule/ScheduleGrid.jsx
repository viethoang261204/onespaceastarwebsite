import { useState } from "react";
import { Plus } from "lucide-react";
import { DAYS, SLOTS } from "../../lib/constants";

const T = {
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
};

export default function ScheduleGrid({
  schedules,
  assignments,
  teachers,
  conflictMap,
  violationSet,
  onAddSlot,
  onRemoveSchedule,
}) {
  const teacherByName = {};
  teachers.forEach((t) => { teacherByName[t.name] = t; });

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700 }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 80 }}></th>
            {DAYS.map((d) => (
              <th key={d} style={{ ...thStyle, textAlign: "center" }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot) => (
            <tr key={slot}>
              <td style={{ ...thStyle, color: T.inkSoft, fontWeight: 500, whiteSpace: "nowrap", fontSize: 11 }}>
                {slot}
              </td>
              {DAYS.map((day) => {
                const cellSchedules = schedules.filter((s) => s.day === day && s.slot === slot);
                return (
                  <td key={day} style={{ ...tdStyle, verticalAlign: "top" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, minHeight: 60 }}>
                      {cellSchedules.map((s) => {
                        const a = assignments.find((x) => x.id === s.assignmentId);
                        if (!a) return null;
                        return (
                          <ScheduleCard
                            key={s.id}
                            schedule={s}
                            assignment={a}
                            teacher={teacherByName[a.teacher]}
                            hasConflict={(conflictMap[`${a.teacher}|${day}|${slot}`] || 0) > 1}
                            hasViolation={violationSet.has(a.id)}
                            onRemove={() => onRemoveSchedule(s.id)}
                          />
                        );
                      })}
                      <button
                        onClick={() => onAddSlot(day, slot)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 4,
                          padding: "4px 6px",
                          background: "transparent",
                          border: `1px dashed ${T.border}`,
                          borderRadius: 6,
                          cursor: "pointer",
                          color: T.muted,
                          fontSize: 11,
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          opacity: 0.7,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleCard({ schedule, assignment, teacher, hasConflict, hasViolation, onRemove }) {
  const [hovered, setHovered] = useState(false);

  let borderColor = T.teal;
  let bg = T.tealLight;
  let icon = null;

  if (hasConflict) {
    borderColor = T.danger;
    bg = T.dangerLight;
    icon = <span title="Trùng giờ GV" style={{ fontSize: 11 }}>⚠️</span>;
  } else if (hasViolation) {
    borderColor = T.amber;
    bg = T.amberLight;
    icon = <span title="GV không rảnh" style={{ fontSize: 11 }}>⚠️</span>;
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 6,
        padding: "5px 8px",
        position: "relative",
        fontSize: 11,
        cursor: "default",
      }}
    >
      {/* Hover remove button */}
      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.dangerLight,
            border: `1px solid ${T.danger}`,
            borderRadius: "50%",
            cursor: "pointer",
            color: T.danger,
            fontSize: 10,
            padding: 0,
          }}
          title="Bỏ xếp"
        >
          ✕
        </button>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
        {icon}
        <span style={{ fontWeight: 600, color: T.ink }}>{assignment.subject}</span>
      </div>
      <div style={{ color: T.inkSoft }}>Lớp {assignment.grade}</div>
      {teacher && (
        <div style={{ color: T.muted, fontSize: 10 }}>{teacher.name}</div>
      )}
      <div style={{ color: T.muted, fontSize: 10 }}>{assignment.hinhthuc}</div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px 8px",
  fontSize: 11,
  fontWeight: 600,
  color: "#8A8377",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  borderBottom: `2px solid #E0D5BD`,
  fontFamily: "'Be Vietnam Pro', sans-serif",
  background: "#FBF8F3",
};

const tdStyle = {
  padding: "6px 4px",
  borderBottom: `1px solid #E0D5BD`,
  borderRight: `1px solid #E0D5BD`,
  background: "#FBF8F3",
};

// Need useState

