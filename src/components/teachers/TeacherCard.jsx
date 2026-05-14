import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AvailabilityHeatmap from "./AvailabilityHeatmap";

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
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
};

export default function TeacherCard({ teacher, availability, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);

  const activeLocations = Object.entries(teacher.locations || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  const activeSubjects = [];
  Object.entries(teacher.subjects || {}).forEach(([program, subjects]) => {
    Object.entries(subjects).forEach(([subject, val]) => {
      if (val && !activeSubjects.includes(subject)) activeSubjects.push(subject);
    });
  });

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: "16px",
        position: "relative",
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Action buttons — show on hover */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 6,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <button
          onClick={onEdit}
          title="Sửa"
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.surfaceAlt,
            border: `1px solid ${T.borderStrong}`,
            borderRadius: 6,
            cursor: "pointer",
            color: T.inkSoft,
          }}
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={onDelete}
          title="Xóa"
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.dangerLight,
            border: `1px solid ${T.danger}`,
            borderRadius: 6,
            cursor: "pointer",
            color: T.danger,
          }}
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Info */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 2 }}>
          {teacher.name}
        </div>
        <div style={{ fontSize: 12, color: T.muted }}>
          {teacher.code && <span>{teacher.code} · </span>}
          {teacher.role}
        </div>
      </div>

      {/* Location chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
        {activeLocations.map((loc) => (
          <span
            key={loc}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: 20,
              background: T.tealLight,
              color: T.teal,
            }}
          >
            {loc}
          </span>
        ))}
        {activeLocations.length === 0 && (
          <span style={{ fontSize: 11, color: T.muted, fontStyle: "italic" }}>
            Chưa khai báo cơ sở
          </span>
        )}
      </div>

      {/* Subject chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {activeSubjects.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: 20,
              background: T.sageLight,
              color: T.sage,
            }}
          >
            {s}
          </span>
        ))}
        {activeSubjects.length === 0 && (
          <span style={{ fontSize: 11, color: T.muted, fontStyle: "italic" }}>
            Chưa khai báo năng lực
          </span>
        )}
      </div>

      {/* Heatmap */}
      <AvailabilityHeatmap availability={availability} compact />
    </div>
  );
}
