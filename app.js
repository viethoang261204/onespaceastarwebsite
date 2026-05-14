// ==================== APP.JS - OneSpace Astar ====================

const STORAGE_KEY = "astar_v2_state";

// ==================== ICONS (SVG inline) ====================
const ICONS = {
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  alert: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  userCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  userX: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  filter: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
  save: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>`,
};

// ==================== HELPERS ====================
function newId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function hinhthucShort(h) {
  return h.replace("Offline ", "");
}

function emptyAvailability() {
  return Object.fromEntries(SEED_DATA.days.map(d => [d, Object.fromEntries(SEED_DATA.slots.map(s => [s, false]))]));
}

function buildEmptyTeacher() {
  return {
    id: newId("t"),
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
  };
}

function teacherCanTeach(teacher, program, subject) {
  return !!(teacher && teacher.subjects && teacher.subjects[program] && teacher.subjects[program][subject]);
}

function teacherTeachesLocation(teacher, hinhthuc) {
  const locs = teacher && teacher.locations;
  if (!locs) return false;
  if (hinhthuc.includes("Times City")) return locs["Times City"];
  if (hinhthuc.includes("Smart City")) return locs["Smart City"];
  if (hinhthuc.includes("Online")) return locs["Online"];
  if (hinhthuc.includes("Tại nhà") || hinhthuc.includes("nhà")) return locs["Tại nhà"];
  return false;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ==================== GLOBAL STATE ====================
let gState = {
  teachers: [],
  availability: {},
  assignments: [],
  schedules: [],
  loaded: false,
};

// ==================== PERSISTENCE ====================
function saveState() {
  if (!gState.loaded) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      teachers: gState.teachers,
      availability: gState.availability,
      assignments: gState.assignments,
      schedules: gState.schedules,
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (Array.isArray(s.teachers)) gState.teachers = s.teachers;
      if (s.availability) gState.availability = s.availability;
      if (Array.isArray(s.assignments)) gState.assignments = s.assignments;
      if (Array.isArray(s.schedules)) gState.schedules = s.schedules;
    }
  } catch (e) {}
  if (gState.teachers.length === 0) {
    gState.teachers = deepClone(SEED_DATA.teachers);
  }
  if (Object.keys(gState.availability).length === 0) {
    gState.availability = deepClone(SEED_DATA.availability);
  }
  if (gState.assignments.length === 0) {
    gState.assignments = deepClone(SEED_DATA.assignments);
  }
  gState.loaded = true;
}

// ==================== TOAST ====================
let toastTimer = null;
function showToast(msg, tone = "ok") {
  let el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${tone}`;
  el.style.display = "block";
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = "none"; }, 2800);
}

// ==================== CRUD ====================
function saveTeacher(oldName, teacher, newAv) {
  if (oldName && oldName !== teacher.name) {
    gState.teachers = gState.teachers.filter(t => t.name !== oldName);
    delete gState.availability[oldName];
    gState.assignments = gState.assignments.map(a =>
      a.teacher === oldName ? { ...a, teacher: teacher.name } : a
    );
  }
  const existing = gState.teachers.find(t => t.id === teacher.id);
  if (!existing) {
    gState.teachers.push(teacher);
  } else {
    Object.assign(existing, teacher);
  }
  gState.availability[teacher.name] = newAv || emptyAvailability();
  saveState();
  showToast(oldName ? `Đã cập nhật ${teacher.name}` : `Đã thêm GV ${teacher.name}`);
}

function deleteTeacher(teacher) {
  if (!confirm(`Xóa giáo viên "${teacher.name}"?\nMọi phân công và lịch xếp của GV này sẽ bị bỏ.`)) return;
  gState.teachers = gState.teachers.filter(t => t.id !== teacher.id);
  delete gState.availability[teacher.name];
  gState.assignments = gState.assignments.map(a =>
    a.teacher === teacher.name ? { ...a, teacher: null } : a
  );
  gState.schedules = gState.schedules.filter(s => {
    const a = gState.assignments.find(x => x.id === s.assignmentId);
    return !(a && a.teacher === teacher.name);
  });
  saveState();
  showToast(`Đã xóa ${teacher.name}`, "danger");
  renderApp();
}

function saveAssignment(assignment) {
  const idx = gState.assignments.findIndex(a => a.id === assignment.id);
  if (idx < 0) {
    gState.assignments.push(assignment);
  } else {
    gState.assignments[idx] = assignment;
  }
  saveState();
  showToast("Đã lưu phân công");
}

function deleteAssignment(assignment) {
  if (!confirm(`Xóa môn "${assignment.subject} - Lớp ${assignment.grade}" ở ${hinhthucShort(assignment.hinhthuc)}?\nMọi lịch xếp của môn này sẽ bị bỏ.`)) return;
  gState.assignments = gState.assignments.filter(a => a.id !== assignment.id);
  gState.schedules = gState.schedules.filter(s => s.assignmentId !== assignment.id);
  saveState();
  showToast("Đã xóa môn", "danger");
  renderApp();
}

function updateAssignmentTeacher(id, teacherName) {
  const a = gState.assignments.find(x => x.id === id);
  if (a) { a.teacher = teacherName || null; saveState(); }
}

function addSchedule(aId, day, slot) {
  gState.schedules.push({ id: newId("sch"), assignmentId: aId, day, slot });
  saveState();
}

function removeSchedule(id) {
  gState.schedules = gState.schedules.filter(s => s.id !== id);
  saveState();
}

// ==================== INSIGHTS ====================
function getInsights() {
  const teacherByName = Object.fromEntries(gState.teachers.map(t => [t.name, t]));
  const unassigned = gState.assignments.filter(a => !a.teacher);
  const wrongCapability = gState.assignments.filter(a => {
    if (!a.teacher) return false;
    const t = teacherByName[a.teacher];
    if (!t) return true;
    return !teacherCanTeach(t, a.program, a.subject) || !teacherTeachesLocation(t, a.hinhthuc);
  });
  const slotMap = {};
  gState.schedules.forEach(s => {
    const a = gState.assignments.find(x => x.id === s.assignmentId);
    if (!a || !a.teacher) return;
    const k = `${a.teacher}|${s.day}|${s.slot}`;
    if (!slotMap[k]) slotMap[k] = [];
    slotMap[k].push({ schedule: s, assignment: a });
  });
  const conflicts = Object.values(slotMap).filter(arr => arr.length > 1);
  const availViolations = [];
  gState.schedules.forEach(s => {
    const a = gState.assignments.find(x => x.id === s.assignmentId);
    if (!a || !a.teacher) return;
    const av = gState.availability[a.teacher];
    if (av && av[s.day] && av[s.day][s.slot] === false) availViolations.push({ schedule: s, assignment: a });
  });
  return { unassigned, wrongCapability, scheduled: gState.schedules.length, conflicts, availViolations };
}

// ==================== EXPORT ====================
function exportData() {
  const blob = new Blob([JSON.stringify({
    teachers: gState.teachers,
    availability: gState.availability,
    assignments: gState.assignments,
    schedules: gState.schedules,
    exportedAt: new Date().toISOString(),
  }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `astar_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Đã xuất file backup");
}

// ==================== RENDER FUNCTIONS ====================

// --- Render Dashboard ---
function renderDashboard() {
  const insights = getInsights();
  const stats = [
    { label: "Giáo viên", value: gState.teachers.length, icon: "users", color: "var(--teal)" },
    { label: "Môn cần phân công", value: gState.assignments.length, icon: "book", color: "var(--ink)" },
    { label: "Đã phân GV", value: gState.assignments.filter(a => a.teacher).length, icon: "userCheck", color: "var(--sage)" },
    { label: "Đã xếp TKB", value: insights.scheduled, icon: "calendar", color: "var(--accent)" },
  ];

  const statCards = stats.map(s => `
    <div class="stat-card">
      <div class="stat-card-icon" style="color:${s.color}">${ICONS[s.icon]}</div>
      <div class="stat-card-value" style="color:${s.color}">${s.value}</div>
      <div class="stat-card-label">${s.label}</div>
    </div>
  `).join("");

  const alertCards = [
    {
      title: "Lớp chưa có GV",
      count: insights.unassigned.length,
      tone: "danger",
      items: insights.unassigned.slice(0, 6).map(a => `${hinhthucShort(a.hinhthuc)} • Lớp ${a.grade} • ${a.subject} (${a.program})`),
      empty: "Tất cả lớp đã có GV phụ trách.",
    },
    {
      title: "GV chưa đủ năng lực dạy môn",
      count: insights.wrongCapability.length,
      tone: "amber",
      items: insights.wrongCapability.slice(0, 6).map(a => `${a.teacher} → ${a.subject} (${a.program}) tại ${hinhthucShort(a.hinhthuc)}`),
      empty: "Mọi phân công đều khớp năng lực GV.",
    },
    {
      title: "Xung đột giờ dạy của GV",
      count: insights.conflicts.length,
      tone: "danger",
      items: insights.conflicts.slice(0, 6).map(c => `${c[0].assignment.teacher} bị xếp ${c.length} lớp cùng ${c[0].schedule.day} ${c[0].schedule.slot}`),
      empty: "Không có GV nào bị trùng lịch.",
    },
    {
      title: "GV không rảnh slot đã xếp",
      count: insights.availViolations.length,
      tone: "amber",
      items: insights.availViolations.slice(0, 6).map(v => `${v.assignment.teacher} • ${v.schedule.day} ${v.schedule.slot} → ${v.assignment.subject}`),
      empty: "Mọi lớp đã xếp đều rơi vào slot GV rảnh.",
    },
  ];

  const alertCardsHtml = alertCards.map(card => {
    const ok = card.count === 0;
    const cClass = ok ? "ok" : card.tone;
    const itemsHtml = ok
      ? `<div class="alert-card-empty">${card.empty}</div>`
      : `<ul class="alert-card-list">${card.items.map(it => `<li><span style="color:var(--${card.tone === 'danger' ? 'danger' : 'amber'})">—</span><span>${it}</span></li>`).join("")}</ul>`;
    return `
      <div class="alert-card">
        <div class="alert-card-header">
          <div class="alert-card-title">${card.title}</div>
          <div class="alert-card-count ${cClass}">
            ${ok ? ICONS.check.replace('width="14"','width="12"').replace('height="14"','height="12"') : ICONS.alert.replace('width="14"','width="12"').replace('height="14"','height="12"')}
            ${card.count}
          </div>
        </div>
        ${itemsHtml}
      </div>
    `;
  }).join("");

  return `
    <div class="space-y-8">
      <div class="section-heading">
        <div>
          <div class="section-eyebrow">Tổng quan</div>
          <div class="section-title">Tình hình giảng dạy</div>
        </div>
      </div>
      <div class="grid md:grid-cols-4 gap-4">${statCards}</div>
      <div class="grid md:grid-cols-2 gap-6">${alertCardsHtml}</div>
      <div class="guide-card">
        <div class="guide-card-header">
          ${ICONS.sparkles}
          <div class="guide-card-title">Hướng dẫn nhanh</div>
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          <div class="guide-item">
            <div class="guide-item-title">1. Quản lý Giáo viên</div>Thêm/sửa GV, click ô lịch để bật-tắt slot rảnh, tick năng lực dạy theo môn.
          </div>
          <div class="guide-item">
            <div class="guide-item-title">2. Phân công môn</div>Thêm môn-lớp mới, chọn GV từ danh sách app gợi ý theo năng lực.
          </div>
          <div class="guide-item">
            <div class="guide-item-title">3. Xếp TKB</div>Gắn lớp vào ngày + giờ. App tự cảnh báo trùng giờ và GV bận.
          </div>
        </div>
        <div class="guide-note">
          💾 <strong>Nhớ backup:</strong> Vào menu "Dữ liệu" ở góc phải để xuất file JSON. Lưu file đó vào Drive/máy để phòng mất dữ liệu khi xóa cache trình duyệt.
        </div>
      </div>
    </div>
  `;
}

// --- Render Teachers ---
let teachersSearch = "";
let teachersFilterSubject = "all";
let teachersFilterLocation = "all";

function renderTeachersTab() {
  const teacherByName = Object.fromEntries(gState.teachers.map(t => [t.name, t]));

  const filtered = gState.teachers.filter(t => {
    if (teachersSearch && !t.name.toLowerCase().includes(teachersSearch.toLowerCase())) return false;
    if (teachersFilterLocation !== "all" && !t.locations[teachersFilterLocation]) return false;
    if (teachersFilterSubject !== "all" && !Object.values(t.subjects).some(p => p[teachersFilterSubject] === true)) return false;
    return true;
  });

  const cardsHtml = filtered.map(t => {
    const locs = Object.entries(t.locations).filter(([, v]) => v).map(([k]) => k);
    const capable = [];
    Object.entries(t.subjects).forEach(([prog, subs]) => {
      Object.entries(subs).forEach(([sub, can]) => { if (can) capable.push(`${prog} ${sub}`); });
    });
    const uniqCapable = [...new Set(capable)];
    const av = gState.availability[t.name];
    const hasAvail = av && Object.values(av).some(day => Object.values(day).some(v => v === true));
    const assignmentsCount = gState.assignments.filter(a => a.teacher === t.name).length;

    const locsHtml = locs.length > 0
      ? locs.map(l => `<span class="chip" style="background:var(--teal-light);color:var(--teal)">${l}</span>`).join("")
      : `<span style="font-size:12px;color:var(--muted);font-style:italic">Chưa khai báo</span>`;

    const capableHtml = uniqCapable.length > 0
      ? uniqCapable.slice(0, 10).map(s => `<span class="chip" style="background:var(--sage-light);color:var(--sage)">${s}</span>`).join("")
      : `<span style="font-size:12px;color:var(--muted);font-style:italic">Chưa khai báo</span>`;

    // Heatmap
    let heatmapHtml = "";
    if (hasAvail) {
      const cellSize = 16;
      const colWidth = cellSize * SEED_DATA.slots.length + (SEED_DATA.slots.length - 1) * 2;
      heatmapHtml = `
        <div class="heatmap-wrap">
          <div class="heatmap-label">
            ${SEED_DATA.days.map(d => `<span style="width:${colWidth}px">${d}</span>`).join("")}
          </div>
          ${SEED_DATA.days.map(d => `
            <div class="heatmap-row">
              ${SEED_DATA.slots.map(s => {
                const free = av && av[d] && av[d][s];
                return `<div class="heatmap-cell ${free ? 'free' : 'busy'}" style="width:${cellSize}px;height:${cellSize}px" title="${d} ${s}: ${free ? 'Rảnh' : 'Bận'}"></div>`;
              }).join("")}
            </div>
          `).join("")}
        </div>
      `;
    }

    return `
      <div class="teacher-card">
        <div class="teacher-card-actions">
          <button class="btn-icon" onclick="openTeacherEdit('${t.id}')" title="Sửa">${ICONS.pencil}</button>
          <button class="btn-icon danger" onclick="deleteTeacherById('${t.id}')" title="Xóa">${ICONS.trash}</button>
        </div>
        <div class="teacher-card-header">
          <div class="teacher-name">${t.name}</div>
          <div class="teacher-code">${t.code || "Chưa có mã"} • ${t.role}</div>
        </div>
        <div class="teacher-section">
          <div style="font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:0.25rem">Cơ sở</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${locsHtml}</div>
        </div>
        <div class="teacher-section">
          <div style="font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:0.25rem">Năng lực giảng dạy (${uniqCapable.length})</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${capableHtml}</div>
        </div>
        <div class="teacher-section">
          <div style="font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:0.25rem">
            Lịch rảnh
            ${assignmentsCount > 0 ? `<span style="color:var(--teal);font-weight:700">• ${assignmentsCount} môn được giao</span>` : ""}
          </div>
          ${hasAvail ? heatmapHtml : `<div style="font-size:12px;color:var(--amber);font-style:italic;margin-top:4px">Chưa cập nhật lịch — click "Sửa" để thêm</div>`}
        </div>
      </div>
    `;
  }).join("");

  const subjectOptions = [{ value: "all", label: "Tất cả môn" }, ...SEED_DATA.allSubjects.map(s => ({ value: s, label: s }))];
  const locationOptions = [{ value: "all", label: "Tất cả cơ sở" }, ...SEED_DATA.locations.map(l => ({ value: l, label: l }))];

  return `
    <div class="space-y-6">
      <div class="section-heading">
        <div>
          <div class="section-eyebrow">Đội ngũ</div>
          <div class="section-title">${gState.teachers.length} giáo viên</div>
        </div>
        <button class="btn btn-primary" onclick="openTeacherNew()">
          ${ICONS.plus} Thêm giáo viên
        </button>
      </div>
      <div class="filter-bar">
        <div class="filter-search">
          ${ICONS.search}
          <input type="text" placeholder="Tìm theo tên giáo viên…" value="${escHtml(teachersSearch)}"
            oninput="teachersSearch=this.value;renderApp()">
        </div>
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">Môn</span>
          <select class="filter-select" onchange="teachersFilterSubject=this.value;renderApp()">
            ${subjectOptions.map(o => `<option value="${o.value}" ${teachersFilterSubject===o.value?'selected':''}>${o.label}</option>`).join("")}
          </select>
        </div>
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">Cơ sở</span>
          <select class="filter-select" onchange="teachersFilterLocation=this.value;renderApp()">
            ${locationOptions.map(o => `<option value="${o.value}" ${teachersFilterLocation===o.value?'selected':''}>${o.label}</option>`).join("")}
          </select>
        </div>
        <div class="filter-count">${filtered.length} kết quả</div>
      </div>
      <div class="teachers-grid">${cardsHtml || `<div style="padding:2rem;text-align:center;color:var(--muted);font-size:14px">Không có giáo viên nào phù hợp.</div>`}</div>
    </div>
  `;
}

// --- Render Assignments ---
let assignFilterHinhthuc = "all";
let assignFilterProgram = "all";
let assignShowOnlyIssues = false;

function renderAssignmentsTab() {
  const teacherByName = Object.fromEntries(gState.teachers.map(t => [t.name, t]));
  const allHinhthuc = [...new Set([...gState.assignments.map(a => a.hinhthuc), ...SEED_DATA.hinhthucs])];

  const filtered = gState.assignments.filter(a => {
    if (assignFilterHinhthuc !== "all" && a.hinhthuc !== assignFilterHinhthuc) return false;
    if (assignFilterProgram !== "all" && a.program !== assignFilterProgram) return false;
    if (assignShowOnlyIssues) {
      if (!a.teacher) return true;
      const t = teacherByName[a.teacher];
      if (!t) return true;
      return !(teacherCanTeach(t, a.program, a.subject) && teacherTeachesLocation(t, a.hinhthuc));
    }
    return true;
  });

  const grouped = {};
  filtered.forEach(a => {
    if (!grouped[a.hinhthuc]) grouped[a.hinhthuc] = [];
    grouped[a.hinhthuc].push(a);
  });

  const groupsHtml = Object.entries(grouped).map(([hinhthuc, items]) => {
    const rowsHtml = items.map(a => {
      const t = a.teacher ? teacherByName[a.teacher] : null;
      const capOk = t && teacherCanTeach(t, a.program, a.subject);
      const locOk = t && teacherTeachesLocation(t, a.hinhthuc);
      const status = !a.teacher ? "missing" : (!capOk ? "warn" : (!locOk ? "warn" : "ok"));
      const statusMap = {
        ok: { label: "Hợp lệ", cls: "ok" },
        missing: { label: "Thiếu GV", cls: "missing" },
        warn: { label: "Sai môn/cơ sở", cls: "warn" },
      };
      const s = statusMap[status];
      return `
        <tr>
          <td>${a.program}</td>
          <td>Lớp ${a.grade}</td>
          <td style="font-weight:500">${a.subject}</td>
          <td>
            <div class="teacher-picker-wrap">
              <button class="teacher-picker-btn" onclick="toggleTeacherPicker('${a.id}', this)">
                <span>${a.teacher || "Chưa chọn GV…"}</span>
                ${ICONS.chevronDown}
              </button>
              <div class="teacher-picker-dropdown" id="picker-${a.id}" style="display:none">
                <div class="picker-backdrop" onclick="hideAllTeacherPickers()"></div>
                ${renderTeacherPickerItems(a)}
              </div>
            </div>
          </td>
          <td>
            <span class="status-badge ${s.cls}">
              ${s.cls === "ok" ? ICONS.check.replace(/width="14"/,'width="11"').replace(/height="14"/,'height="11"') :
                s.cls === "missing" ? ICONS.userX.replace(/width="14"/,'width="11"').replace(/height="14"/,'height="11"') :
                ICONS.alert.replace(/width="14"/,'width="11"').replace(/height="14"/,'height="11"')}
              ${s.label}
            </span>
          </td>
          <td>
            <button class="btn-icon danger" onclick="deleteAssignmentById('${a.id}')" title="Xóa">${ICONS.trash}</button>
          </td>
        </tr>
      `;
    }).join("");

    return `
      <div class="table-wrap">
        <div class="table-group-header">
          ${ICONS.mapPin}
          ${hinhthucShort(hinhthuc)}
          <span>${items.length} môn</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Chương trình</th><th>Lớp</th><th>Môn</th>
              <th style="width:280px">Giáo viên</th>
              <th>Trạng thái</th><th style="width:40px"></th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }).join("");

  return `
    <div class="space-y-6">
      <div class="section-heading">
        <div>
          <div class="section-eyebrow">Phân công môn</div>
          <div class="section-title">${gState.assignments.length} môn theo cơ sở</div>
        </div>
        <button class="btn btn-primary" onclick="openAssignmentModal()">
          ${ICONS.plus} Thêm môn - lớp
        </button>
      </div>
      <div class="filter-bar">
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">Cơ sở</span>
          <select class="filter-select" onchange="assignFilterHinhthuc=this.value;renderApp()">
            <option value="all" ${assignFilterHinhthuc==='all'?'selected':''}>Tất cả cơ sở</option>
            ${allHinhthuc.map(h => `<option value="${h}" ${assignFilterHinhthuc===h?'selected':''}>${hinhthucShort(h)}</option>`).join("")}
          </select>
        </div>
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">Chương trình</span>
          <select class="filter-select" onchange="assignFilterProgram=this.value;renderApp()">
            <option value="all" ${assignFilterProgram==='all'?'selected':''}>Tất cả chương trình</option>
            ${SEED_DATA.programs.map(p => `<option value="${p}" ${assignFilterProgram===p?'selected':''}>${p}</option>`).join("")}
          </select>
        </div>
        <button class="filter-toggle-btn ${assignShowOnlyIssues ? 'active' : 'inactive'}"
          onclick="assignShowOnlyIssues=!assignShowOnlyIssues;renderApp()">
          ${ICONS.alert} Chỉ hiển thị có vấn đề
        </button>
        <div class="filter-count">${filtered.length} kết quả</div>
      </div>
      ${groupsHtml}
    </div>
  `;
}

function renderTeacherPickerItems(a) {
  const eligible = gState.teachers.filter(t => teacherCanTeach(t, a.program, a.subject) && teacherTeachesLocation(t, a.hinhthuc));
  const others = gState.teachers.filter(t => !eligible.find(e => e.id === t.id));
  let html = "";
  if (eligible.length > 0) {
    html += `<div class="picker-group-header green">GỢI Ý (${eligible.length} GV ĐỦ NĂNG LỰC + DẠY CƠ SỞ NÀY)</div>`;
    eligible.forEach(t => {
      html += `<button class="picker-item ${a.teacher === t.name ? 'selected' : ''}" onclick="pickTeacher('${a.id}','${t.name}')">
        <span>${t.name}</span>
        ${a.teacher === t.name ? `<span style="color:var(--teal)">${ICONS.check.replace(/width="14"/,'width="13"').replace(/height="14"/,'height="13"')}</span>` : ""}
      </button>`;
    });
  }
  if (others.length > 0) {
    html += `<div class="picker-group-header amber">KHÔNG ĐỦ ĐIỀU KIỆN</div>`;
    others.forEach(t => {
      const reason = teacherCanTeach(t, a.program, a.subject) ? "Khác cơ sở" : "Thiếu môn";
      html += `<button class="picker-item" onclick="pickTeacher('${a.id}','${t.name}')">
        <span>${t.name}</span>
        <span style="font-size:10px;color:var(--muted)">${reason}</span>
      </button>`;
    });
  }
  if (a.teacher) {
    html += `<button class="picker-remove" onclick="pickTeacher('${a.id}',null)">✕ Bỏ phân công</button>`;
  }
  return html;
}

// --- Render Schedule ---
let schedFilterHinhthuc = "all";
let schedFilterTeacher = "all";

function renderScheduleTab() {
  const teacherByName = Object.fromEntries(gState.teachers.map(t => [t.name, t]));
  const allHinhthuc = [...new Set(gState.assignments.map(a => a.hinhthuc))];
  const allTeachers = [...new Set(gState.assignments.filter(a => a.teacher).map(a => a.teacher))].sort();

  let visibleAssignments = schedFilterHinhthuc === "all" ? gState.assignments : gState.assignments.filter(a => a.hinhthuc === schedFilterHinhthuc);
  if (schedFilterTeacher !== "all") visibleAssignments = visibleAssignments.filter(a => a.teacher === schedFilterTeacher);
  const visibleSchedules = gState.schedules.filter(s => visibleAssignments.some(a => a.id === s.assignmentId));

  const cellMap = {};
  visibleSchedules.forEach(s => {
    const a = gState.assignments.find(x => x.id === s.assignmentId);
    const key = `${s.day}|${s.slot}`;
    if (!cellMap[key]) cellMap[key] = [];
    cellMap[key].push({ schedule: s, assignment: a });
  });

  const globalSlotMap = {};
  gState.schedules.forEach(s => {
    const a = gState.assignments.find(x => x.id === s.assignmentId);
    if (!a || !a.teacher) return;
    const k = `${a.teacher}|${s.day}|${s.slot}`;
    globalSlotMap[k] = (globalSlotMap[k] || 0) + 1;
  });

  const cellsHtml = SEED_DATA.slots.map(slot => {
    const cells = SEED_DATA.days.map(day => {
      const items = cellMap[`${day}|${slot}`] || [];
      const itemsHtml = items.map(({ schedule, assignment }) => {
        const av = assignment.teacher && gState.availability[assignment.teacher];
        const conflict = assignment.teacher && globalSlotMap[`${assignment.teacher}|${day}|${slot}`] > 1;
        const notFree = av && av[day] && av[day][slot] === false;
        const tone = conflict ? "danger" : (notFree ? "amber" : "ok");
        const tc = {
          ok: { bg: "var(--teal-light)", border: "var(--teal)" },
          amber: { bg: "var(--amber-light)", border: "var(--amber)" },
          danger: { bg: "var(--danger-light)", border: "var(--danger)" },
        }[tone];
        return `
          <div class="schedule-item ${tone}" style="background:${tc.bg};border-left:3px solid ${tc.border}">
            <div class="schedule-item-name">${assignment.subject} • Lớp ${assignment.grade}</div>
            <div class="schedule-item-teacher">${assignment.teacher || "Chưa có GV"}</div>
            <div class="schedule-item-loc">${hinhthucShort(assignment.hinhthuc)}</div>
            ${(conflict || notFree) ? `<div class="schedule-item-warn ${tone}">
              ${ICONS.alert} ${conflict ? "Trùng giờ GV" : "GV không rảnh"}
            </div>` : ""}
            <button class="schedule-item-remove" onclick="removeScheduleById('${schedule.id}')">
              ${ICONS.x.replace('width="20"','width="11"').replace('height="20"','height="11"')}
            </button>
          </div>
        `;
      }).join("");
      const addBtn = `
        <button class="add-class-btn" onclick="openAddScheduleModal('${day}','${slot}')">
          ${ICONS.plus} Thêm
        </button>
      `;
      return `<td><div class="schedule-cell">${itemsHtml}${addBtn}</div></td>`;
    }).join("");
    return `<tr><td>${slot}</td>${cells}</tr>`;
  }).join("");

  return `
    <div class="space-y-6">
      <div class="section-heading">
        <div>
          <div class="section-eyebrow">Thời khóa biểu</div>
          <div class="section-title">Lịch dạy theo tuần</div>
        </div>
      </div>
      <div class="filter-bar">
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">Cơ sở</span>
          <select class="filter-select" onchange="schedFilterHinhthuc=this.value;renderApp()">
            <option value="all" ${schedFilterHinhthuc==='all'?'selected':''}>Tất cả cơ sở</option>
            ${allHinhthuc.map(h => `<option value="${h}" ${schedFilterHinhthuc===h?'selected':''}>${hinhthucShort(h)}</option>`).join("")}
          </select>
        </div>
        <div class="filter-select-wrap">
          ${ICONS.filter}
          <span class="filter-label">GV</span>
          <select class="filter-select" onchange="schedFilterTeacher=this.value;renderApp()">
            <option value="all" ${schedFilterTeacher==='all'?'selected':''}>Tất cả GV</option>
            ${allTeachers.map(t => `<option value="${t}" ${schedFilterTeacher===t?'selected':''}>${t}</option>`).join("")}
          </select>
        </div>
        <div class="filter-count">${visibleSchedules.length} lớp đã xếp / ${visibleAssignments.filter(a=>a.teacher).length} cần xếp</div>
      </div>

      <div class="schedule-grid-wrap">
        <div style="overflow-x:auto">
          <table class="schedule-grid">
            <thead>
              <tr>
                <th>KHUNG GIỜ</th>
                ${SEED_DATA.days.map(d => `<th>${d}</th>`).join("")}
              </tr>
            </thead>
            <tbody>${cellsHtml}</tbody>
          </table>
        </div>
      </div>

      <div class="schedule-legend">
        <div class="legend-item">
          <div class="legend-swatch" style="background:var(--teal-light);border-color:var(--teal)"></div>
          <span style="color:var(--ink-soft)">Lớp xếp đúng</span>
        </div>
        <div class="legend-item">
          <div class="legend-swatch" style="background:var(--amber-light);border-color:var(--amber)"></div>
          <span style="color:var(--ink-soft)">GV không rảnh slot này</span>
        </div>
        <div class="legend-item">
          <div class="legend-swatch" style="background:var(--danger-light);border-color:var(--danger)"></div>
          <span style="color:var(--ink-soft)">GV bị trùng giờ</span>
        </div>
      </div>
    </div>
  `;
}

// ==================== MODAL HELPERS ====================
function escHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function renderModal(content) {
  document.getElementById("modal-container").innerHTML = content;
}

function closeModal() {
  document.getElementById("modal-container").innerHTML = "";
}

// --- Teacher Modal ---
let teacherEditId = null;
let teacherStep = "info";

function openTeacherNew() {
  teacherEditId = null;
  teacherStep = "info";
  renderTeacherModal(buildEmptyTeacher(), emptyAvailability(), true, null);
}

function openTeacherEdit(id) {
  teacherEditId = id;
  teacherStep = "info";
  const t = gState.teachers.find(x => x.id === id);
  if (!t) return;
  const av = gState.availability[t.name] || emptyAvailability();
  renderTeacherModal(deepClone(t), deepClone(av), false, t.name);
}

// We store the edited teacher/availability in a global var for the modal
let _modalTeacher = null;
let _modalAv = null;
let _modalIsNew = false;
let _modalOldName = null;

function renderTeacherModal(t, av, isNew, oldName) {
  _modalTeacher = deepClone(t);
  _modalAv = deepClone(av);
  _modalIsNew = isNew;
  _modalOldName = oldName;
  teacherStep = teacherStep || "info";
  _renderTeacherModalStep();
}

function _renderTeacherModalStep() {
  const t = _modalTeacher;
  const av = _modalAv;
  const step = teacherStep;
  const nameValid = t.name.trim().length > 0;

  let stepContent = "";
  if (step === "info") {
    const locBtns = SEED_DATA.locations.map(loc => {
      const on = t.locations[loc];
      return `<button class="loc-btn ${on?'on':''}" onclick="toggleModalLocation('${loc}')">
        ${on ? `<span class="loc-btn-check">${ICONS.check.replace(/width="14"/,'width="14"').replace(/height="14"/,'height="14"')}</span>` : `<span class="loc-btn-icon"></span>`}
        ${loc}
      </button>`;
    }).join("");

    stepContent = `
      <div class="form-field">
        <label class="form-label">Họ tên</label>
        <input class="form-input" type="text" value="${escHtml(t.name)}" placeholder="VD: Nguyễn Văn A"
          oninput="_modalTeacher.name=this.value;updateTeacherNameDisplay()">
      </div>
      <div class="form-grid-2">
        <div class="form-field">
          <label class="form-label">Mã nhân viên</label>
          <input class="form-input" type="text" value="${escHtml(t.code)}" placeholder="VD: T6-0001"
            oninput="_modalTeacher.code=this.value">
        </div>
        <div class="form-field">
          <label class="form-label">Chức vụ</label>
          <select class="form-input" onchange="_modalTeacher.role=this.value">
            <option ${t.role==='Giáo Viên'?'selected':''}>Giáo Viên</option>
            <option ${t.role==='Trợ giảng'?'selected':''}>Trợ giảng</option>
            <option ${t.role==='Trợ giảng - Admin'?'selected':''}>Trợ giảng - Admin</option>
          </select>
        </div>
      </div>
      <div class="form-field">
        <label class="form-label">Cơ sở dạy được</label>
        <div class="location-btns">${locBtns}</div>
      </div>
    `;
  } else if (step === "capabilities") {
    const progs = SEED_DATA.programs.filter(p => p !== "A LEVEL");
    const allSubs = SEED_DATA.allSubjects;
    const rows = progs.map(prog => {
      const subs = allSubs.map(sub => {
        const allowed = SEED_DATA.subjectsByProgram[prog] && SEED_DATA.subjectsByProgram[prog].includes(sub);
        if (!allowed) return `<td class="na">—</td>`;
        const on = t.subjects[prog] && t.subjects[prog][sub];
        return `<td>
          <button class="cap-toggle-btn ${on?'on':''}" onclick="toggleModalSubject('${prog}','${sub}')">
            ${on ? "✓" : ""}
          </button>
        </td>`;
      }).join("");
      const label = prog === "AS" ? "AS / A Level" : prog;
      return `<tr><td>${label}</td>${subs}</tr>`;
    }).join("");

    stepContent = `
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px">Tick các môn GV này có thể dạy. AS và A Level dùng chung.</div>
      <table class="cap-table">
        <thead>
          <tr>
            <th style="text-align:left">CHƯƠNG TRÌNH</th>
            ${allSubs.map(s => `<th>${s}</th>`).join("")}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } else if (step === "availability") {
    const rows = SEED_DATA.slots.map(slot => {
      const cells = SEED_DATA.days.map(day => {
        const on = av[day] && av[day][slot];
        return `<td>
          <button class="avail-cell-btn ${on?'free':''}" onclick="toggleModalSlot('${day}','${slot}')">
            ${on ? "Rảnh" : ""}
          </button>
        </td>`;
      }).join("");
      return `<tr><td>${slot}</td>${cells}</tr>`;
    }).join("");

    stepContent = `
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px">Click vào ô để bật/tắt slot rảnh.</div>
      <div class="avail-table-wrap">
        <table class="avail-table">
          <thead>
            <tr>
              <th>KHUNG GIỜ</th>
              ${SEED_DATA.days.map(d => `<th>${d}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  const modal = `
    <div class="modal-backdrop" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header">
          <div>
            <div class="modal-header-eyebrow">${_modalIsNew ? "Thêm giáo viên mới" : "Sửa thông tin giáo viên"}</div>
            <div class="modal-header-title" id="modal-teacher-name">${t.name || "(chưa đặt tên)"}</div>
          </div>
          <button class="modal-header-close" onclick="closeModal()">${ICONS.x}</button>
        </div>
        <div class="modal-tabs">
          <button class="modal-tab ${step==='info'?'active':''}" onclick="teacherStep='info';_renderTeacherModalStep()">Thông tin & cơ sở</button>
          <button class="modal-tab ${step==='capabilities'?'active':''}" onclick="teacherStep='capabilities';_renderTeacherModalStep()">Năng lực dạy</button>
          <button class="modal-tab ${step==='availability'?'active':''}" onclick="teacherStep='availability';_renderTeacherModalStep()">Lịch rảnh</button>
        </div>
        <div class="modal-body">${stepContent}</div>
        <div class="modal-footer">
          <div class="modal-footer-left">${!nameValid ? "⚠️ Cần nhập tên GV trước khi lưu" : ""}</div>
          <div class="modal-footer-right">
            <button class="btn btn-secondary" onclick="closeModal()">Hủy</button>
            <button class="btn btn-primary" ${!nameValid?'disabled':''} onclick="saveTeacherFromModal()">
              ${ICONS.save} Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modal);
}

function updateTeacherNameDisplay() {
  const el = document.getElementById("modal-teacher-name");
  if (el) el.textContent = _modalTeacher.name || "(chưa đặt tên)";
}

function toggleModalLocation(loc) {
  _modalTeacher.locations[loc] = !_modalTeacher.locations[loc];
  _renderTeacherModalStep();
}

function toggleModalSubject(prog, sub) {
  if (!_modalTeacher.subjects[prog]) return;
  const current = !!_modalTeacher.subjects[prog][sub];
  _modalTeacher.subjects[prog][sub] = !current;
  if (prog === "AS") _modalTeacher.subjects["A LEVEL"][sub] = !current;
  if (prog === "A LEVEL") _modalTeacher.subjects["AS"][sub] = !current;
  _renderTeacherModalStep();
}

function toggleModalSlot(day, slot) {
  if (!_modalAv[day]) _modalAv[day] = {};
  _modalAv[day][slot] = !_modalAv[day][slot];
  _renderTeacherModalStep();
}

function saveTeacherFromModal() {
  if (!_modalTeacher.name.trim()) return;
  saveTeacher(_modalOldName, _modalTeacher, _modalAv);
  closeModal();
  renderApp();
}

// --- Assignment Modal ---
function openAssignmentModal() {
  const h = SEED_DATA.hinhthucs[0];
  const p = SEED_DATA.programs[0];
  const grades = SEED_DATA.gradesByProgram[p] || [6];
  const subs = SEED_DATA.subjectsByProgram[p] || ["Math"];

  const modal = `
    <div class="modal-backdrop" onclick="if(event.target===this)closeModal()">
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-header-title">Thêm môn - lớp mới</div>
          <button class="modal-header-close" onclick="closeModal()">${ICONS.x}</button>
        </div>
        <div class="modal-body">
          <div class="form-field">
            <label class="form-label">Cơ sở / Hình thức</label>
            <select class="form-input" id="assign-modal-hinhthuc">
              ${SEED_DATA.hinhthucs.map(h => `<option value="${h}">${h}</option>`).join("")}
            </select>
          </div>
          <div class="form-grid-3">
            <div class="form-field">
              <label class="form-label">Chương trình</label>
              <select class="form-input" id="assign-modal-program" onchange="onAssignProgramChange()">
                ${SEED_DATA.programs.map(p => `<option value="${p}">${p}</option>`).join("")}
              </select>
            </div>
            <div class="form-field">
              <label class="form-label">Lớp</label>
              <select class="form-input" id="assign-modal-grade">
                ${grades.map(g => `<option value="${g}">Lớp ${g}</option>`).join("")}
              </select>
            </div>
            <div class="form-field">
              <label class="form-label">Môn</label>
              <select class="form-input" id="assign-modal-subject">
                ${subs.map(s => `<option value="${s}">${s}</option>`).join("")}
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div></div>
          <div class="modal-footer-right">
            <button class="btn btn-secondary" onclick="closeModal()">Hủy</button>
            <button class="btn btn-primary" onclick="saveNewAssignment()">
              ${ICONS.plus} Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modal);
}

function onAssignProgramChange() {
  const p = document.getElementById("assign-modal-program").value;
  const grades = SEED_DATA.gradesByProgram[p] || [6];
  const subs = SEED_DATA.subjectsByProgram[p] || ["Math"];
  document.getElementById("assign-modal-grade").innerHTML = grades.map(g => `<option value="${g}">Lớp ${g}</option>`).join("");
  document.getElementById("assign-modal-subject").innerHTML = subs.map(s => `<option value="${s}">${s}</option>`).join("");
}

function saveNewAssignment() {
  const hinhthuc = document.getElementById("assign-modal-hinhthuc").value;
  const program = document.getElementById("assign-modal-program").value;
  const grade = Number(document.getElementById("assign-modal-grade").value);
  const subject = document.getElementById("assign-modal-subject").value;
  saveAssignment({ id: newId("a"), hinhthuc, program, grade, subject, teacher: null });
  closeModal();
  renderApp();
}

// --- Add Schedule Modal ---
let _addSchedDay = null;
let _addSchedSlot = null;

function openAddScheduleModal(day, slot) {
  _addSchedDay = day;
  _addSchedSlot = slot;

  let visibleAssignments = schedFilterHinhthuc === "all" ? gState.assignments : gState.assignments.filter(a => a.hinhthuc === schedFilterHinhthuc);
  if (schedFilterTeacher !== "all") visibleAssignments = visibleAssignments.filter(a => a.teacher === schedFilterTeacher);
  visibleAssignments = visibleAssignments.filter(a => a.teacher);

  const annotated = visibleAssignments.map(a => {
    const alreadyScheduled = gState.schedules.some(s => s.assignmentId === a.id);
    const av = gState.availability[a.teacher];
    const free = av && av[day] && av[day][slot] === true;
    const teacherBusy = gState.schedules.some(s => {
      const aa = gState.assignments.find(x => x.id === s.assignmentId);
      return aa && aa.teacher === a.teacher && s.day === day && s.slot === slot;
    });
    return { a, alreadyScheduled, free, teacherBusy };
  });

  annotated.sort((x, y) => {
    const score = (item) => (item.free ? 0 : 1) + (item.teacherBusy ? 2 : 0) + (item.alreadyScheduled ? 4 : 0);
    return score(x) - score(y);
  });

  const itemsHtml = annotated.map(({ a, alreadyScheduled, free, teacherBusy }) => {
    const warn = !free || teacherBusy || alreadyScheduled;
    let badge = "";
    if (alreadyScheduled) badge = `<span class="chip" style="background:var(--surface-alt);color:var(--muted)">Đã xếp lịch khác</span>`;
    else if (teacherBusy) badge = `<span class="chip" style="background:var(--danger-light);color:var(--danger)">GV trùng giờ</span>`;
    else if (!free) badge = `<span class="chip" style="background:var(--amber-light);color:var(--amber)">GV không rảnh</span>`;
    else badge = `<span class="chip" style="background:var(--sage-light);color:var(--sage)">GV rảnh</span>`;

    return `
      <button class="schedule-add-item ${alreadyScheduled?'scheduled':''} ${warn&&!alreadyScheduled?'warn':''}"
        onclick="${alreadyScheduled?'':`addScheduleAndClose('${a.id}')`}"
        ${alreadyScheduled ? 'disabled' : ''}>
        <div class="schedule-add-item-left">
          <div class="schedule-add-item-name">${a.subject} • Lớp ${a.grade}</div>
          <div class="schedule-add-item-sub">${a.teacher} • ${a.program}</div>
        </div>
        <div class="schedule-add-item-right">${badge}</div>
      </button>
    `;
  }).join("");

  const modal = `
    <div class="modal-backdrop" onclick="if(event.target===this)closeModal()">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div>
            <div class="modal-header-eyebrow">Thêm lớp vào khung giờ</div>
            <div class="modal-header-title">${day} • ${slot}</div>
          </div>
          <button class="modal-header-close" onclick="closeModal()">${ICONS.x}</button>
        </div>
        <div class="modal-body">
          <div class="modal-search">
            ${ICONS.search}
            <input type="text" placeholder="Tìm lớp / môn / GV…" id="sched-search"
              oninput="filterScheduleAddItems(this.value)">
          </div>
          <div class="schedule-add-list" id="sched-add-list">${itemsHtml}</div>
        </div>
      </div>
    </div>
  `;
  renderModal(modal);
}

function addScheduleAndClose(aId) {
  addSchedule(aId, _addSchedDay, _addSchedSlot);
  closeModal();
  renderApp();
}

function filterScheduleAddItems(query) {
  const q = query.toLowerCase();
  const items = document.querySelectorAll(".schedule-add-item");
  items.forEach(item => {
    const text = item.querySelector(".schedule-add-item-name").textContent + " " +
      item.querySelector(".schedule-add-item-sub").textContent;
    item.style.display = !q || text.toLowerCase().includes(q) ? "" : "none";
  });
}

// --- Teacher picker (inline) ---
let activePickerId = null;

function toggleTeacherPicker(id, btn) {
  hideAllTeacherPickers();
  const el = document.getElementById("picker-" + id);
  if (!el) return;
  const isVisible = el.style.display !== "none";
  if (!isVisible) {
    el.style.display = "block";
    activePickerId = id;
  } else {
    el.style.display = "none";
    activePickerId = null;
  }
}

function hideAllTeacherPickers() {
  document.querySelectorAll(".teacher-picker-dropdown").forEach(el => { el.style.display = "none"; });
  activePickerId = null;
}

function pickTeacher(aId, teacherName) {
  updateAssignmentTeacher(aId, teacherName);
  hideAllTeacherPickers();
  renderApp();
}

// ==================== MAIN RENDER ====================
let currentTab = "dashboard";

function renderApp() {
  const el = document.getElementById("app-content");
  if (!el) return;

  let content = "";
  if (currentTab === "dashboard") content = renderDashboard();
  else if (currentTab === "teachers") content = renderTeachersTab();
  else if (currentTab === "assignments") content = renderAssignmentsTab();
  else if (currentTab === "schedule") content = renderScheduleTab();

  el.innerHTML = `<div class="page-section">${content}</div>`;

  // Update nav tabs
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === currentTab);
  });

  // Update alert badge
  const insights = getInsights();
  const alertCount = insights.unassigned.length + insights.wrongCapability.length + insights.conflicts.length + insights.availViolations.length;
  const badgeEl = document.getElementById("alert-badge");
  if (badgeEl) {
    if (alertCount > 0) {
      badgeEl.style.display = "";
      badgeEl.innerHTML = `${ICONS.alert} ${alertCount} cảnh báo`;
    } else {
      badgeEl.style.display = "none";
    }
  }
}

// ==================== INIT ====================
function initApp() {
  loadState();
  renderApp();
}

// Expose globals for inline handlers
window.openTeacherNew = openTeacherNew;
window.openTeacherEdit = openTeacherEdit;
window.deleteTeacherById = (id) => {
  const t = gState.teachers.find(x => x.id === id);
  if (t) deleteTeacher(t);
};
window.deleteAssignmentById = (id) => {
  const a = gState.assignments.find(x => x.id === id);
  if (a) deleteAssignment(a);
};
window.removeScheduleById = (id) => {
  removeSchedule(id);
  renderApp();
};
window.toggleTeacherPicker = toggleTeacherPicker;
window.hideAllTeacherPickers = hideAllTeacherPickers;
window.pickTeacher = pickTeacher;
window.openAssignmentModal = openAssignmentModal;
window.saveNewAssignment = saveNewAssignment;
window.onAssignProgramChange = onAssignProgramChange;
window.openAddScheduleModal = openAddScheduleModal;
window.addScheduleAndClose = addScheduleAndClose;
window.filterScheduleAddItems = filterScheduleAddItems;
window.toggleModalLocation = toggleModalLocation;
window.toggleModalSubject = toggleModalSubject;
window.toggleModalSlot = toggleModalSlot;
window.saveTeacherFromModal = saveTeacherFromModal;
window.updateTeacherNameDisplay = updateTeacherNameDisplay;
window._renderTeacherModalStep = _renderTeacherModalStep;
window.closeModal = closeModal;
