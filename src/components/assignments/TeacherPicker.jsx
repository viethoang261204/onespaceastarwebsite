import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
};

export default function TeacherPicker({ assignment, teachers, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { eligible, ineligible } = getEligibleTeachers(teachers, assignment.hinhthuc, assignment.program, assignment.subject);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = teachers.find((t) => t.name === value);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          background: selected ? T.surface : T.surfaceAlt,
          fontSize: 12,
          color: selected ? T.ink : T.muted,
          cursor: "pointer",
          fontFamily: "'Be Vietnam Pro', sans-serif",
          textAlign: "left",
          gap: 6,
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected ? selected.name : "— Chọn giáo viên —"}
        </span>
        <ChevronDown size={13} style={{ flexShrink: 0, color: T.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: T.surface,
            border: `1px solid ${T.borderStrong}`,
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 100,
            overflow: "hidden",
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {eligible.length > 0 && (
            <>
              <div style={{ padding: "7px 12px 4px", fontSize: 10, fontWeight: 700, color: T.sage, textTransform: "uppercase", letterSpacing: "0.06em", background: T.sageLight }}>
                GỢI Ý ({eligible.length} GV đủ năng lực)
              </div>
              {eligible.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { onChange(t.name); setOpen(false); }}
                  style={pickerItemStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.background = T.sageLight; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  {t.name}
                  <span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>{t.role}</span>
                </button>
              ))}
            </>
          )}

          {eligible.length > 0 && ineligible.length > 0 && (
            <div style={{ borderTop: `1px solid ${T.border}`, margin: "4px 0" }} />
          )}

          {ineligible.length > 0 && (
            <>
              <div style={{ padding: "7px 12px 4px", fontSize: 10, fontWeight: 700, color: T.amber, textTransform: "uppercase", letterSpacing: "0.06em", background: T.amberLight }}>
                KHÔNG ĐỦ ĐIỀU KIỆN
              </div>
              {ineligible.map(({ teacher, reasons }) => (
                <button
                  key={teacher.id}
                  disabled
                  style={{ ...pickerItemStyle, opacity: 0.6, cursor: "not-allowed" }}
                >
                  <span>{teacher.name}</span>
                  <span style={{ fontSize: 10, color: T.amber, marginLeft: 6 }}>{reasons.join(", ")}</span>
                </button>
              ))}
            </>
          )}

          {value && (
            <>
              <div style={{ borderTop: `1px solid ${T.border}`, margin: "4px 0" }} />
              <button
                onClick={() => { onChange(null); setOpen(false); }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  fontSize: 12,
                  color: T.muted,
                  cursor: "pointer",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontStyle: "italic",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.surfaceAlt; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                ✕ Bỏ phân công
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const pickerItemStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "7px 12px",
  background: "transparent",
  border: "none",
  textAlign: "left",
  fontSize: 12,
  color: "#1A1A1A",
  cursor: "pointer",
  fontFamily: "'Be Vietnam Pro', sans-serif",
};
