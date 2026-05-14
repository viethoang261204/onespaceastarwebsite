import { gradesByProgram, subjectsByProgram } from "./constants";

export function canTeach(teacher, program, subject) {
  return !!teacher?.subjects?.[program]?.[subject];
}

export function teachesLocation(teacher, hinhthuc) {
  const L = teacher?.locations;
  if (!L) return false;
  if (hinhthuc.includes("Times City")) return !!L["Times City"];
  if (hinhthuc.includes("Smart City")) return !!L["Smart City"];
  if (hinhthuc.includes("Online")) return !!L["Online"];
  if (hinhthuc.includes("Tại nhà") || hinhthuc.includes("nhà"))
    return !!L["Tại nhà"];
  return false;
}

export function detectConflicts(schedules, assignments) {
  const map = {};
  schedules.forEach((s) => {
    const a = assignments.find((x) => x.id === s.assignmentId);
    if (!a?.teacher) return;
    const k = `${a.teacher}|${s.day}|${s.slot}`;
    (map[k] = map[k] || []).push({ schedule: s, assignment: a });
  });
  return Object.values(map).filter((arr) => arr.length > 1);
}

export function detectAvailabilityViolations(schedules, assignments, availability) {
  const violations = [];
  schedules.forEach((s) => {
    const a = assignments.find((x) => x.id === s.assignmentId);
    if (!a?.teacher) return;
    const av = availability[a.teacher];
    if (av && av[s.day]?.[s.slot] === false) {
      violations.push({ schedule: s, assignment: a });
    }
  });
  return violations;
}

export function assignmentStatus(a, teacherByName) {
  if (!a.teacher) return "missing";
  const t = teacherByName[a.teacher];
  if (!t) return "missing";
  if (!canTeach(t, a.program, a.subject)) return "wrong-subject";
  if (!teachesLocation(t, a.hinhthuc)) return "wrong-location";
  return "ok";
}

export function getEligibleTeachers(teachers, hinhthuc, program, subject) {
  const eligible = [];
  const ineligible = [];
  teachers.forEach((t) => {
    const okSubject = canTeach(t, program, subject);
    const okLocation = teachesLocation(t, hinhthuc);
    if (okSubject && okLocation) {
      eligible.push(t);
    } else {
      const reasons = [];
      if (!okLocation) reasons.push("Khác cơ sở");
      if (!okSubject) reasons.push("Thiếu môn");
      ineligible.push({ teacher: t, reasons });
    }
  });
  return { eligible, ineligible };
}

export function makeId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function getAvailableGrades(program) {
  return gradesByProgram[program] || [];
}

export function getAvailableSubjects(program) {
  return subjectsByProgram[program] || [];
}
