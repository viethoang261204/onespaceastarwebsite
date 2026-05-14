import { useState, useMemo } from "react";
import { Calendar, Plus } from "lucide-react";
import ScheduleGrid from "../schedule/ScheduleGrid";
import AddScheduleModal from "../schedule/AddScheduleModal";
import { HINHTHUCS, DAYS, SLOTS } from "../../lib/constants";
import { detectConflicts, detectAvailabilityViolations } from "../../lib/validators";

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
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
};

export default function ScheduleTab({ state, setState, teacherByName, addToast }) {
  const { teachers, assignments, schedules, availability } = state;
  const [filterHinhthuc, setFilterHinhthuc] = useState("");
  const [addModal, setAddModal] = useState(null); // null | { day, slot }

  // Global conflict map: "teacher|day|slot" -> count
  const conflictMap = useMemo(() => {
    const m = {};
    schedules.forEach((s) => {
      const a = assignments.find((x) => x.id === s.assignmentId);
      if (!a?.teacher) return;
      const k = `${a.teacher}|${s.day}|${s.slot}`;
      m[k] = (m[k] || 0) + 1;
    });
    return m;
  }, [schedules, assignments]);

  // Violation map: "assignmentId" -> true
  const violationSet = useMemo(() => {
    const s = new Set();
    detectAvailabilityViolations(schedules, assignments, availability).forEach((v) => {
      s.add(v.schedule.assignmentId);
    });
    return s;
  }, [schedules, assignments, availability]);

  // Filter schedules by hinhthuc
  const filteredSchedules = useMemo(() => {
    if (!filterHinhthuc) return schedules;
    return schedules.filter((s) => {
      const a = assignments.find((x) => x.id === s.assignmentId);
      return a?.hinhthuc === filterHinhthuc;
    });
  }, [schedules, assignments, filterHinhthuc]);

  const schedulableAssignments = assignments.filter((a) => a.teacher);

  const handleAddSchedule = (day, slot) => {
    setAddModal({ day, slot });
  };

  const handleConfirmAdd = (assignmentId) => {
    if (!addModal) return;
    const { day, slot } = addModal;
    // Check if already scheduled
    const existing = schedules.find(
      (s) => s.assignmentId === assignmentId && s.day === day && s.slot === slot
    );
    if (existing) {
      setAddModal(null);
      return;
    }
    setState((prev) => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        { id: `sch_${Date.now()}`, assignmentId, day, slot },
      ],
    }));
    setAddModal(null);
    addToast("Đã xếp lớp vào thời khóa biểu!", "ok");
  };

  const handleRemoveSchedule = (scheduleId) => {
    if (!window.confirm("Bỏ xếp lớp này?")) return;
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((s) => s.id !== scheduleId),
    }));
    addToast("Đã bỏ khỏi thời khóa biểu.", "info");
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Calendar size={20} color={T.teal} />
          <span style={{ fontSize: 16, fontWeight: 600, color: T.ink }}>
            Thời khóa biểu
          </span>
          <span style={{ fontSize: 13, color: T.muted }}>
            ({filteredSchedules.length} lớp đã xếp / {schedulableAssignments.length} cần xếp)
          </span>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <select value={filterHinhthuc} onChange={(e) => setFilterHinhthuc(e.target.value)}
          style={{ padding: "7px 10px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, fontFamily: "'Be Vietnam Pro', sans-serif", background: T.surface, color: T.inkSoft }}>
          <option value="">Tất cả cơ sở</option>
          {HINHTHUCS.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>

      {/* Schedule grid */}
      <ScheduleGrid
        schedules={filteredSchedules}
        assignments={assignments}
        teachers={teachers}
        conflictMap={conflictMap}
        violationSet={violationSet}
        onAddSlot={handleAddSchedule}
        onRemoveSchedule={handleRemoveSchedule}
      />

      {/* Add modal */}
      {addModal && (
        <AddScheduleModal
          day={addModal.day}
          slot={addModal.slot}
          assignments={schedulableAssignments}
          teachers={teachers}
          schedules={schedules}
          conflictMap={conflictMap}
          violationSet={violationSet}
          onConfirm={handleConfirmAdd}
          onClose={() => setAddModal(null)}
        />
      )}
    </div>
  );
}
