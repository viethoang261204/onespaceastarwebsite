import { useState } from "react";
import { X } from "lucide-react";
import { HINHTHUCS, PROGRAMS, gradesByProgram, subjectsByProgram } from "../../lib/constants";
import { getEligibleTeachers } from "../../lib/validators";

const T = {
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  accent: "#B85C38",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
};

export default function AssignmentAddModal({ assignments, teachers, onAdd, onClose }) {
  const [hinhthuc, setHinhthuc] = useState(HINHTHUCS[0]);
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [grade, setGrade] = useState(gradesByProgram[PROGRAMS[0]][0]);
  const [subject, setSubject] = useState(subjectsByProgram[PROGRAMS[0]][0]);

  const grades = gradesByProgram[program] || [];
  const subjects = subjectsByProgram[program] || [];

  const handleProgramChange = (p) => {
    setProgram(p);
    const newGrades = gradesByProgram[p] || [];
    const newSubjects = subjectsByProgram[p] || [];
    setGrade(newGrades[0]);
    setSubject(newSubjects[0]);
  };

  // Check duplicate
  const isDuplicate = assignments.some(
    (a) => a.hinhthuc === hinhthuc && a.program === program && a.grade === grade && a.subject === subject
  );

  const handleAdd = () => {
    if (isDuplicate) return;
    onAdd({
      id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      hinhthuc,
      program,
      grade,
      subject,
      teacher: null,
    });
    onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: T.surface,
          borderRadius: 16,
          width: "100%",
          maxWidth: 440,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Fraunces', serif" }}>
            Thêm môn – lớp
          </span>
          <button onClick={onClose} style={iconBtnStyle}>
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <FieldRow label="Hình thức">
            <select value={hinhthuc} onChange={(e) => setHinhthuc(e.target.value)} style={selectStyle}>
              {HINHTHUCS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </FieldRow>

          <FieldRow label="Chương trình">
            <select value={program} onChange={(e) => handleProgramChange(e.target.value)} style={selectStyle}>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </FieldRow>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FieldRow label="Lớp">
              <select value={grade} onChange={(e) => setGrade(Number(e.target.value))} style={selectStyle}>
                {grades.map((g) => <option key={g} value={g}>Lớp {g}</option>)}
              </select>
            </FieldRow>
            <FieldRow label="Môn">
              <select value={subject} onChange={(e) => setSubject(e.target.value)} style={selectStyle}>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FieldRow>
          </div>

          {isDuplicate && (
            <div style={{ padding: "10px 14px", background: "#F4E5C3", border: "1px solid #D4A056", borderRadius: 8, fontSize: 13, color: "#8F3F22" }}>
              Môn-lớp này đã tồn tại trong hệ thống.
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={secondaryBtnStyle}>Hủy</button>
          <button onClick={handleAdd} disabled={isDuplicate} style={{ ...primaryBtnStyle, background: isDuplicate ? T.border : T.accent, cursor: isDuplicate ? "not-allowed" : "pointer" }}>
            Thêm
          </button>
        </div>
      </div>
    </Overlay>
  );
}

function FieldRow({ label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.inkSoft, marginBottom: 5, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "8px 10px",
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "'Be Vietnam Pro', sans-serif",
  color: T.ink,
  background: T.surface,
  outline: "none",
  boxSizing: "border-box",
};

const secondaryBtnStyle = {
  padding: "8px 18px",
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  background: T.surface,
  fontSize: 13,
  fontWeight: 500,
  color: T.inkSoft,
  cursor: "pointer",
  fontFamily: "'Be Vietnam Pro', sans-serif",
};

const primaryBtnStyle = {
  padding: "8px 18px",
  border: "none",
  borderRadius: 8,
  background: T.accent,
  fontSize: 13,
  fontWeight: 600,
  color: "#fff",
  cursor: "pointer",
  fontFamily: "'Be Vietnam Pro', sans-serif",
};

const iconBtnStyle = {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: T.surfaceAlt,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  cursor: "pointer",
  color: T.muted,
};

function Overlay({ children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16 }} onClick={onClose}>
      {children}
    </div>
  );
}
