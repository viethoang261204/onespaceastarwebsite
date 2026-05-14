import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import TeacherCard from "../teachers/TeacherCard";
import TeacherEditModal from "../teachers/TeacherEditModal";
import { makeId } from "../../lib/validators";

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

const ALL_PROGRAMS = ["Checkpoint", "IGCSE", "AS", "A LEVEL", "IB"];
const ALL_SUBJECTS = ["Math", "Science", "Biology", "Chemistry", "Physics"];

export default function TeachersTab({ state, setState, addToast }) {
  const { teachers, availability } = state;
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [editTeacher, setEditTeacher] = useState(null); // null | teacherObj
  const [isNew, setIsNew] = useState(false);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterSubject) {
        const has = ALL_PROGRAMS.some((p) => t.subjects?.[p]?.[filterSubject]);
        if (!has) return false;
      }
      if (filterLocation) {
        if (!t.locations?.[filterLocation]) return false;
      }
      return true;
    });
  }, [teachers, search, filterSubject, filterLocation]);

  const handleDelete = (teacher) => {
    if (!window.confirm(`Xóa giáo viên "${teacher.name}"? Assignments dùng GV này sẽ được bỏ phân công.`)) return;
    setState((prev) => {
      const teachers2 = prev.teachers.filter((t) => t.id !== teacher.id);
      const availability2 = { ...prev.availability };
      delete availability2[teacher.name];
      const assignments2 = prev.assignments.map((a) =>
        a.teacher === teacher.name ? { ...a, teacher: null } : a
      );
      return { ...prev, teachers: teachers2, availability: availability2, assignments: assignments2 };
    });
    addToast(`Đã xóa giáo viên "${teacher.name}"`, "ok");
  };

  const handleAddNew = () => {
    setEditTeacher({
      id: makeId("t"),
      code: "",
      name: "",
      role: "Giáo Viên",
      locations: { "Times City": false, "Smart City": false, "Online": false, "Tại nhà": false },
      subjects: {
        Checkpoint: { Math: false, Science: false },
        IGCSE: { Math: false, Science: false, Biology: false, Chemistry: false, Physics: false },
        AS: { Math: false, Biology: false, Chemistry: false, Physics: false },
        "A LEVEL": { Math: false, Biology: false, Chemistry: false, Physics: false },
        IB: { Math: false, Biology: false, Chemistry: false, Physics: false },
      },
    });
    setIsNew(true);
  };

  const handleSave = (updated, updatedAvail) => {
    setState((prev) => {
      let teachers2;
      if (isNew) {
        teachers2 = [...prev.teachers, updated];
      } else {
        teachers2 = prev.teachers.map((t) => (t.id === updated.id ? updated : t));
      }

      // Handle name change in availability
      const old = isNew ? null : prev.teachers.find((t) => t.id === updated.id);
      const availability2 = { ...prev.availability };

      if (!isNew && old && old.name !== updated.name) {
        availability2[updated.name] = updatedAvail || availability2[old.name] || {};
        delete availability2[old.name];
        const assignments2 = prev.assignments.map((a) =>
          a.teacher === old.name ? { ...a, teacher: updated.name } : a
        );
        return { ...prev, teachers: teachers2, availability: availability2, assignments: assignments2 };
      }

      // Update availability
      if (updatedAvail) {
        availability2[updated.name] = updatedAvail;
      }

      // If new teacher, ensure availability entry exists
      if (isNew && !availability2[updated.name]) {
        const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
        const slots = ["8:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00", "18:00-19:30", "19:30-21:00", "Sau 21:00"];
        availability2[updated.name] = {};
        days.forEach((d) => {
          availability2[updated.name][d] = {};
          slots.forEach((s) => { availability2[updated.name][d][s] = false; });
        });
      }

      return { ...prev, teachers: teachers2, availability: availability2 };
    });
    setEditTeacher(null);
    setIsNew(false);
    addToast(isNew ? "Đã thêm giáo viên mới!" : "Đã lưu thay đổi!", "ok");
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Users size={20} color={T.teal} />
          <span style={{ fontSize: 16, fontWeight: 600, color: T.ink }}>
            {teachers.length} giáo viên
          </span>
        </div>
        <button
          onClick={handleAddNew}
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
          Thêm giáo viên
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
          <input
            type="text"
            placeholder="Tìm theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px 8px 32px",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              background: T.surface,
              color: T.ink,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          style={{
            padding: "8px 10px",
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            background: T.surface,
            color: T.inkSoft,
            cursor: "pointer",
          }}
        >
          <option value="">Tất cả môn</option>
          {ALL_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{
            padding: "8px 10px",
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            background: T.surface,
            color: T.inkSoft,
            cursor: "pointer",
          }}
        >
          <option value="">Tất cả cơ sở</option>
          {["Times City", "Smart City", "Online", "Tại nhà"].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: T.muted, fontSize: 14 }}>
          Không tìm thấy giáo viên nào.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {filtered.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              availability={availability[teacher.name] || {}}
              onEdit={() => { setEditTeacher(teacher); setIsNew(false); }}
              onDelete={() => handleDelete(teacher)}
            />
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editTeacher && (
        <TeacherEditModal
          teacher={editTeacher}
          isNew={isNew}
          availability={availability[editTeacher.name] || {}}
          onSave={handleSave}
          onClose={() => { setEditTeacher(null); setIsNew(false); }}
        />
      )}
    </div>
  );
}
