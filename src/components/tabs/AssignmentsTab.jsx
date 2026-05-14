import { useState, useMemo } from "react";
import { Plus, BookOpen, Trash2 } from "lucide-react";
import AssignmentAddModal from "../assignments/AssignmentAddModal";
import TeacherPicker from "../assignments/TeacherPicker";
import StatusBadge from "../assignments/StatusBadge";
import { HINHTHUCS, PROGRAMS } from "../../lib/constants";

const T = {
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  accent: "#B85C38",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
};

export default function AssignmentsTab({ state, setState, teacherByName, addToast }) {
  const { teachers, assignments } = state;
  const [filterHinhthuc, setFilterHinhthuc] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [showProblemsOnly, setShowProblemsOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const teacherByName2 = useMemo(() => {
    const m = {};
    teachers.forEach((t) => { m[t.name] = t; });
    return m;
  }, [teachers]);

  const getStatus = (a) => {
    if (!a.teacher) return "missing";
    const t = teacherByName2[a.teacher];
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
  };

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      if (filterHinhthuc && a.hinhthuc !== filterHinhthuc) return false;
      if (filterProgram && a.program !== filterProgram) return false;
      if (showProblemsOnly) {
        const s = getStatus(a);
        if (s === "ok") return false;
      }
      return true;
    });
  }, [assignments, filterHinhthuc, filterProgram, showProblemsOnly]);

  const grouped = useMemo(() => {
    const groups = {};
    HINHTHUCS.forEach((h) => { groups[h] = []; });
    filtered.forEach((a) => {
      if (groups[a.hinhthuc]) groups[a.hinhthuc].push(a);
    });
    return groups;
  }, [filtered]);

  const handleTeacherChange = (assignmentId, teacherName) => {
    setState((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === assignmentId ? { ...a, teacher: teacherName || null } : a
      ),
    }));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Xóa môn-lớp này?")) return;
    setState((prev) => ({
      ...prev,
      assignments: prev.assignments.filter((a) => a.id !== id),
    }));
    addToast("Đã xóa môn-lớp.", "ok");
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BookOpen size={20} color={T.teal} />
          <span style={{ fontSize: 16, fontWeight: 600, color: T.ink }}>
            {assignments.length} môn – lớp
          </span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: T.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}
        >
          <Plus size={15} />
          Thêm môn – lớp
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <select value={filterHinhthuc} onChange={(e) => setFilterHinhthuc(e.target.value)}
          style={{ padding: "7px 10px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontFamily: "'Be Vietnam Pro', sans-serif", background: T.surface, color: T.inkSoft }}>
          <option value="">Tất cả hình thức</option>
          {HINHTHUCS.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}
          style={{ padding: "7px 10px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontFamily: "'Be Vietnam Pro', sans-serif", background: T.surface, color: T.inkSoft }}>
          <option value="">Tất cả chương trình</option>
          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.inkSoft, cursor: "pointer" }}>
          <input type="checkbox" checked={showProblemsOnly} onChange={(e) => setShowProblemsOnly(e.target.checked)}
            style={{ accentColor: T.accent }} />
          Chỉ hiển thị có vấn đề
        </label>
      </div>

      {/* Grouped tables */}
      {Object.entries(grouped).map(([hinhthuc, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={hinhthuc} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.teal,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  background: T.teal,
                  borderRadius: 4,
                }}
              />
              {hinhthuc}
              <span style={{ color: T.muted, fontWeight: 400 }}>({items.length})</span>
            </div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: T.surfaceAlt }}>
                    <th style={thStyle}>Chương trình</th>
                    <th style={thStyle}>Lớp</th>
                    <th style={thStyle}>Môn</th>
                    <th style={{ ...thStyle, minWidth: 200 }}>Giáo viên</th>
                    <th style={thStyle}>Trạng thái</th>
                    <th style={{ ...thStyle, width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => {
                    const status = getStatus(a);
                    return (
                      <tr key={a.id} style={{ borderTop: `1px solid ${T.border}` }}>
                        <td style={tdStyle}>{a.program}</td>
                        <td style={tdStyle}>{a.grade}</td>
                        <td style={tdStyle}>{a.subject}</td>
                        <td style={tdStyle}>
                          <TeacherPicker
                            assignment={a}
                            teachers={teachers}
                            value={a.teacher}
                            onChange={(name) => handleTeacherChange(a.id, name)}
                          />
                        </td>
                        <td style={tdStyle}>
                          <StatusBadge status={status} />
                        </td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>
                          <button
                            onClick={() => handleDelete(a.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: T.muted,
                              padding: 4,
                              display: "flex",
                              alignItems: "center",
                            }}
                            title="Xóa"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: T.muted, fontSize: 14 }}>
          Không có môn-lớp nào phù hợp bộ lọc.
        </div>
      )}

      {showAddModal && (
        <AssignmentAddModal
          assignments={assignments}
          teachers={teachers}
          onAdd={(a) => {
            setState((prev) => ({ ...prev, assignments: [...prev.assignments, a] }));
            addToast("Đã thêm môn-lớp mới!", "ok");
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "9px 12px",
  fontSize: 11,
  fontWeight: 600,
  color: "#8A8377",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontFamily: "'Be Vietnam Pro', sans-serif",
};

const tdStyle = {
  padding: "10px 12px",
  fontSize: 13,
  color: "#1A1A1A",
  verticalAlign: "middle",
  fontFamily: "'Be Vietnam Pro', sans-serif",
};
