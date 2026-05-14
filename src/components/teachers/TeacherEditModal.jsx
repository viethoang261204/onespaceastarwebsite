import { useState } from "react";
import { X } from "lucide-react";
import AvailabilityEditor from "./AvailabilityEditor";

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
};

const PROGRAMS = ["Checkpoint", "IGCSE", "AS", "A LEVEL", "IB"];
const SUBJECTS = ["Math", "Science", "Biology", "Chemistry", "Physics"];
const LOCATIONS = ["Times City", "Smart City", "Online", "Tại nhà"];
const ROLES = ["Giáo Viên", "Trợ giảng", "Trợ giảng - Admin"];

// which programs a subject is valid for
const subjectPrograms = {};
SUBJECTS.forEach((s) => { subjectPrograms[s] = []; });
PROGRAMS.forEach((p) => {
  const validSubs = {
    Checkpoint: ["Math", "Science"],
    IGCSE: ["Math", "Biology", "Chemistry", "Physics"],
    AS: ["Math", "Biology", "Chemistry", "Physics"],
    "A LEVEL": ["Math", "Biology", "Chemistry", "Physics"],
    IB: ["Math", "Biology", "Chemistry", "Physics"],
  };
  (validSubs[p] || []).forEach((s) => { if (!subjectPrograms[s].includes(p)) subjectPrograms[s].push(p); });
});

export default function TeacherEditModal({ teacher, isNew, availability, onSave, onClose }) {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(JSON.parse(JSON.stringify(teacher)));
  const [avail, setAvail] = useState(JSON.parse(JSON.stringify(availability)));

  const tabs = ["Thông tin & cơ sở", "Năng lực dạy", "Lịch rảnh"];

  const set = (path, val) => {
    setForm((f) => {
      const next = JSON.parse(JSON.stringify(f));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const toggleLocation = (loc) => {
    setForm((f) => ({
      ...f,
      locations: { ...f.locations, [loc]: !f.locations[loc] },
    }));
  };

  // Toggle subject — AS/A LEVEL must be synced
  const toggleSubject = (program, subject) => {
    const current = !!form.subjects[program]?.[subject];
    setForm((f) => {
      const next = { ...f, subjects: { ...f.subjects } };
      next.subjects[program] = { ...(next.subjects[program] || {}) };
      next.subjects[program][subject] = !current;
      // Sync AS <-> A LEVEL
      if (program === "AS") {
        next.subjects["A LEVEL"] = { ...(next.subjects["A LEVEL"] || {}) };
        next.subjects["A LEVEL"][subject] = !current;
      } else if (program === "A LEVEL") {
        next.subjects["AS"] = { ...(next.subjects["AS"] || {}) };
        next.subjects["AS"][subject] = !current;
      }
      return next;
    });
  };

  const toggleAvail = (day, slot) => {
    setAvail((a) => ({
      ...a,
      [day]: { ...(a[day] || {}), [slot]: !a[day]?.[slot] },
    }));
  };

  const canSave = form.name.trim().length > 0;

  const handleSave = () => {
    const { _availability, ...teacherData } = { ...form, _availability: avail };
    onSave(teacherData, avail);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div
        style={{
          background: T.surface,
          borderRadius: 16,
          width: "100%",
          maxWidth: 700,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: "'Fraunces', serif" }}>
              {isNew ? "Thêm giáo viên mới" : "Sửa thông tin giáo viên"}
            </div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{form.name || "(chưa nhập tên)"}</div>
          </div>
          <button
            onClick={onClose}
            style={{
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
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                flex: 1,
                padding: "10px",
                fontSize: 13,
                fontWeight: tab === i ? 600 : 400,
                color: tab === i ? T.accent : T.muted,
                background: tab === i ? T.surface : "transparent",
                border: "none",
                borderBottom: tab === i ? `2px solid ${T.accent}` : "2px solid transparent",
                cursor: "pointer",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                marginBottom: -1,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
          {tab === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="Họ tên" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  style={inputStyle}
                />
              </Field>
              <Field label="Mã giáo viên">
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => set("code", e.target.value)}
                  placeholder="VD: T6-0001"
                  style={inputStyle}
                />
              </Field>
              <Field label="Vai trò">
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Cơ sở làm việc">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {LOCATIONS.map((loc) => (
                    <ToggleBtn
                      key={loc}
                      active={!!form.locations[loc]}
                      label={loc}
                      onClick={() => toggleLocation(loc)}
                    />
                  ))}
                </div>
              </Field>
            </div>
          )}

          {tab === 1 && (
            <div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 12 }}>
                Click ô để bật/tắt năng lực dạy. Hàng AS và A LEVEL được đồng bộ.
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 12, color: T.muted, borderBottom: `1px solid ${T.border}`, fontWeight: 500 }}>Chương trình</th>
                    {SUBJECTS.map((s) => (
                      <th key={s} style={{ textAlign: "center", padding: "6px 4px", fontSize: 12, color: T.muted, borderBottom: `1px solid ${T.border}`, fontWeight: 500 }}>{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROGRAMS.map((p) => (
                    <tr key={p}>
                      <td style={{ padding: "6px 8px", fontSize: 13, color: T.inkSoft, fontWeight: 500 }}>{p}</td>
                      {SUBJECTS.map((s) => {
                        const allowed = subjectPrograms[s].includes(p);
                        const checked = !!form.subjects?.[p]?.[s];
                        if (!allowed) {
                          return (
                            <td key={s} style={{ textAlign: "center", padding: 4, color: T.borderStrong, fontSize: 12 }}>
                              —
                            </td>
                          );
                        }
                        return (
                          <td key={s} style={{ textAlign: "center", padding: 4 }}>
                            <button
                              onClick={() => toggleSubject(p, s)}
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                border: `1.5px solid ${checked ? T.sage : T.borderStrong}`,
                                background: checked ? T.sageLight : "transparent",
                                cursor: "pointer",
                                fontSize: 14,
                                color: checked ? T.sage : T.muted,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                              }}
                            >
                              {checked ? "✓" : ""}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 2 && (
            <AvailabilityEditor availability={avail} onToggle={toggleAvail} />
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              background: T.surface,
              fontSize: 13,
              fontWeight: 500,
              color: T.inkSoft,
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{
              padding: "8px 18px",
              border: "none",
              borderRadius: 8,
              background: canSave ? T.accent : T.border,
              fontSize: 13,
              fontWeight: 600,
              color: canSave ? "#fff" : T.muted,
              cursor: canSave ? "pointer" : "not-allowed",
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.inkSoft, marginBottom: 5, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}{required && <span style={{ color: T.accent, marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function ToggleBtn({ active, label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "9px 12px",
        borderRadius: 8,
        border: `1.5px solid ${active ? T.teal : T.border}`,
        background: active ? T.tealLight : hover ? T.surfaceAlt : T.surface,
        color: active ? T.teal : T.inkSoft,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        transition: "all 0.12s",
      }}
    >
      {label}
    </button>
  );
}

const inputStyle = {
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

function ModalOverlay({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        padding: 16,
      }}
      onClick={onClose}
    >
      {children}
    </div>
  );
}
