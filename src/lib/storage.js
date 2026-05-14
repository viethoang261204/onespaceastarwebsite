import * as XLSX from "xlsx";

const KEY = "astar_v1_state";

export function loadState(seedData) {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return {
    teachers: seedData.teachers,
    availability: seedData.availability,
    assignments: seedData.assignments,
    schedules: [],
  };
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

export function exportJSON(state) {
  const blob = new Blob(
    [JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `astar_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const d = JSON.parse(e.target.result);
        if (!d.teachers || !d.assignments) {
          throw new Error("Sai định dạng");
        }
        resolve(d);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}

export function resetToSeed(seedData) {
  return {
    teachers: seedData.teachers,
    availability: seedData.availability,
    assignments: seedData.assignments,
    schedules: [],
  };
}

// ---- Excel Export ----
function locationLabel(hinhthuc) {
  if (hinhthuc.includes("Times City")) return "Times City";
  if (hinhthuc.includes("Smart City")) return "Smart City";
  if (hinhthuc.includes("Online")) return "Online";
  if (hinhthuc.includes("Tại nhà")) return "Tại nhà";
  return hinhthuc;
}

function canTeach(teacher, program, subject) {
  return !!teacher?.subjects?.[program]?.[subject];
}

function teachesLocation(teacher, hinhthuc) {
  const L = teacher?.locations;
  if (!L) return false;
  if (hinhthuc.includes("Times City")) return !!L["Times City"];
  if (hinhthuc.includes("Smart City")) return !!L["Smart City"];
  if (hinhthuc.includes("Online")) return !!L["Online"];
  if (hinhthuc.includes("Tại nhà") || hinhthuc.includes("nhà")) return !!L["Tại nhà"];
  return false;
}

function getAssignmentStatus(a, teacherByName) {
  if (!a.teacher) return "Thiếu GV";
  const t = teacherByName[a.teacher];
  if (!t) return "Thiếu GV";
  if (!canTeach(t, a.program, a.subject)) return "Sai môn";
  if (!teachesLocation(t, a.hinhthuc)) return "Sai cơ sở";
  return "Hợp lệ";
}

function colWidths(ws, widths) {
  ws["!cols"] = widths.map((w) => ({ wch: w }));
}

export function exportExcel(state) {
  const { teachers, assignments, schedules, availability } = state;

  const teacherByName = {};
  teachers.forEach((t) => { teacherByName[t.name] = t; });

  const wb = XLSX.utils.book_new();

  // ---- Sheet 1: Tổng quan ----
  const dashData = [
    ["ONESPACE ASTAR — BÁO CÁO TỔNG HỢP"],
    [],
    ["Ngày xuất:", new Date().toLocaleString("vi-VN")],
    [],
    ["SỐ LIỆU TỔNG QUAN"],
    ["Tổng giáo viên", teachers.length],
    ["Tổng môn-lớp cần phân công", assignments.length],
    ["Đã phân giáo viên", assignments.filter((a) => a.teacher).length],
    ["Đã xếp thời khóa biểu", schedules.length],
    [],
    ["VẤN ĐỀ CẦN XỬ LÝ"],
  ];

  const unassigned = assignments.filter((a) => !a.teacher);
  const wrongCap = assignments.filter((a) => {
    const s = getAssignmentStatus(a, teacherByName);
    return s === "Sai môn" || s === "Sai cơ sở";
  });
  const conflictMap = {};
  schedules.forEach((s) => {
    const a = assignments.find((x) => x.id === s.assignmentId);
    if (!a?.teacher) return;
    const k = `${a.teacher}|${s.day}|${s.slot}`;
    conflictMap[k] = (conflictMap[k] || 0) + 1;
  });
  const conflicts = Object.entries(conflictMap).filter(([, c]) => c > 1);

  const availVio = [];
  schedules.forEach((s) => {
    const a = assignments.find((x) => x.id === s.assignmentId);
    if (!a?.teacher) return;
    const av = availability[a.teacher];
    if (av && av[s.day]?.[s.slot] === false) availVio.push(s);
  });

  if (unassigned.length > 0) {
    dashData.push(["⚠ Lớp chưa có giáo viên (" + unassigned.length + ")", "Chương trình", "Lớp", "Môn", "Cơ sở"]);
    unassigned.forEach((a) => {
      dashData.push(["", a.program, a.grade, a.subject, locationLabel(a.hinhthuc)]);
    });
  }

  if (wrongCap.length > 0) {
    dashData.push(["⚠ GV chưa đủ năng lực (" + wrongCap.length + ")", "Chương trình", "Lớp", "Môn", "GV", "Vấn đề"]);
    wrongCap.forEach((a) => {
      dashData.push(["", a.program, a.grade, a.subject, a.teacher, getAssignmentStatus(a, teacherByName)]);
    });
  }

  if (conflicts.length > 0) {
    dashData.push(["⚠ Xung đột giờ dạy (" + conflicts.length + ")", "GV", "Ngày", "Slot"]);
    conflicts.forEach(([k]) => {
      const [teacher, day, slot] = k.split("|");
      const schedItems = schedules.filter((s) => {
        const a = assignments.find((x) => x.id === s.assignmentId);
        return a?.teacher === teacher && s.day === day && s.slot === slot;
      });
      schedItems.forEach((s) => {
        const a = assignments.find((x) => x.id === s.assignmentId);
        dashData.push(["", teacher, day, slot, a?.subject + " Lớp " + a?.grade + " — " + locationLabel(a?.hinhthuc)]);
      });
    });
  }

  if (availVio.length > 0) {
    dashData.push(["⚠ GV không rảnh slot đã xếp (" + availVio.length + ")", "GV", "Ngày", "Slot", "Môn-Lớp"]);
    availVio.forEach((s) => {
      const a = assignments.find((x) => x.id === s.assignmentId);
      dashData.push(["", a?.teacher, s.day, s.slot, (a?.subject || "?") + " Lớp " + (a?.grade || "?")]);
    });
  }

  if (unassigned.length === 0 && wrongCap.length === 0 && conflicts.length === 0 && availVio.length === 0) {
    dashData.push(["✓ Không có vấn đề — mọi thứ ổn"]);
  }

  const ws1 = XLSX.utils.aoa_to_sheet(dashData);
  colWidths(ws1, [30, 20, 10, 15, 25, 20]);
  XLSX.utils.book_append_sheet(wb, ws1, "Tổng quan");

  // ---- Sheet 2: Giáo viên ----
  const teacherData = [
    ["STT", "Mã GV", "Họ tên", "Vai trò", "Times City", "Smart City", "Online", "Tại nhà",
     "Checkpoint Math", "Checkpoint Science",
     "IGCSE Math", "IGCSE Science", "IGCSE Biology", "IGCSE Chemistry", "IGCSE Physics",
     "AS Math", "AS Biology", "AS Chemistry", "AS Physics",
     "A LEVEL Math", "A LEVEL Biology", "A LEVEL Chemistry", "A LEVEL Physics",
     "IB Math", "IB Biology", "IB Chemistry", "IB Physics",
     "Lịch rảnh (T2→CN, slot)"],
  ];
  teachers.forEach((t, i) => {
    const loc = t.locations || {};
    const subs = t.subjects || {};
    const av = availability[t.name] || {};
    const DAYS2 = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const SLOTS2 = ["8:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00", "18:00-19:30", "19:30-21:00", "Sau 21:00"];
    const availStr = DAYS2.map((d) => {
      const freeSlots = SLOTS2.filter((s) => av[d]?.[s]).join(", ");
      return freeSlots ? d + ": " + freeSlots : d + ": —";
    }).join(" | ");

    teacherData.push([
      i + 1, t.code || "", t.name, t.role || "",
      loc["Times City"] ? "✓" : "✗",
      loc["Smart City"] ? "✓" : "✗",
      loc["Online"] ? "✓" : "✗",
      loc["Tại nhà"] ? "✓" : "✗",
      subs.Checkpoint?.Math ? "✓" : "✗",
      subs.Checkpoint?.Science ? "✓" : "✗",
      subs.IGCSE?.Math ? "✓" : "✗",
      subs.IGCSE?.Science ? "✓" : "✗",
      subs.IGCSE?.Biology ? "✓" : "✗",
      subs.IGCSE?.Chemistry ? "✓" : "✗",
      subs.IGCSE?.Physics ? "✓" : "✗",
      subs.AS?.Math ? "✓" : "✗",
      subs.AS?.Biology ? "✓" : "✗",
      subs.AS?.Chemistry ? "✓" : "✗",
      subs.AS?.Physics ? "✓" : "✗",
      subs["A LEVEL"]?.Math ? "✓" : "✗",
      subs["A LEVEL"]?.Biology ? "✓" : "✗",
      subs["A LEVEL"]?.Chemistry ? "✓" : "✗",
      subs["A LEVEL"]?.Physics ? "✓" : "✗",
      subs.IB?.Math ? "✓" : "✗",
      subs.IB?.Biology ? "✓" : "✗",
      subs.IB?.Chemistry ? "✓" : "✗",
      subs.IB?.Physics ? "✓" : "✗",
      availStr,
    ]);
  });
  const ws2 = XLSX.utils.aoa_to_sheet(teacherData);
  colWidths(ws2, [5, 12, 22, 16, 10, 10, 10, 10, 14, 15, 10, 13, 13, 15, 13, 8, 12, 13, 11, 13, 13, 15, 14, 8, 12, 14, 14, 40]);
  XLSX.utils.book_append_sheet(wb, ws2, "Giáo viên");

  // ---- Sheet 3: Phân công ----
  const assignData = [
    ["STT", "Hình thức", "Cơ sở", "Chương trình", "Lớp", "Môn", "Giáo viên", "Trạng thái"],
  ];
  assignments.forEach((a, i) => {
    const status = getAssignmentStatus(a, teacherByName);
    assignData.push([
      i + 1,
      a.hinhthuc,
      locationLabel(a.hinhthuc),
      a.program,
      a.grade,
      a.subject,
      a.teacher || "(chưa phân)",
      status,
    ]);
  });
  const ws3 = XLSX.utils.aoa_to_sheet(assignData);
  colWidths(ws3, [5, 22, 12, 12, 8, 12, 22, 12]);
  XLSX.utils.book_append_sheet(wb, ws3, "Phân công");

  // ---- Sheet 4: Thời khóa biểu ----
  const DAYS3 = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const SLOTS3 = ["8:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00", "18:00-19:30", "19:30-21:00", "Sau 21:00"];

  // Build a 2D grid: rows=slots+1 (header), cols=days+1 (slot col)
  const tkbData = [[""].concat(DAYS3)];
  SLOTS3.forEach((slot) => {
    const row = [slot];
    DAYS3.forEach((day) => {
      const cellSchedules = schedules.filter((s) => s.day === day && s.slot === slot);
      if (cellSchedules.length === 0) {
        row.push("");
      } else {
        const lines = cellSchedules.map((s) => {
          const a = assignments.find((x) => x.id === s.assignmentId);
          if (!a) return "";
          const conflictKey = `${a.teacher}|${day}|${slot}`;
          const isConflict = (conflictMap[conflictKey] || 0) > 1;
          const flag = isConflict ? "⚠ " : "";
          return `${flag}${a.subject} Lớp ${a.grade} — ${a.teacher || "(GV?)"} — ${locationLabel(a.hinhthuc)}`;
        });
        row.push(lines.join("\n"));
      }
    });
    tkbData.push(row);
  });

  const ws4 = XLSX.utils.aoa_to_sheet(tkbData);
  // Set row heights for multi-line cells
  ws4["!rows"] = tkbData.map(() => ({ hpt: 60 }));
  colWidths(ws4, [16, 35, 35, 35, 35, 35, 35, 35]);
  XLSX.utils.book_append_sheet(wb, ws4, "Thời khóa biểu");

  // Download
  XLSX.writeFile(wb, `astar_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// ---- Import Schedule from Excel ----
const DAY_MAP = {
  "Thứ 2": "T2", "Thứ 3": "T3", "Thứ 4": "T4", "Thứ 5": "T5",
  "Thứ 6": "T6", "Thứ 7": "T7", "Chủ Nhật": "CN",
};

const SLOT_MAP = {
  "8:00–10:00": "8:00-10:00", "9:00–10:30": "8:00-10:00",
  "10:00–12:00": "10:00-12:00", "10:30–12:00": "10:00-12:00",
  "14:00–16:00": "14:00-16:00", "14:00–15:30": "14:00-16:00", "14:00–17:00": "14:00-16:00",
  "16:00–18:00": "16:00-18:00", "16:30–18:00": "16:00-18:00",
  "17:00–18:30": "16:00-18:00", "17:30–19:00": "16:00-18:00",
  "18:00–19:30": "18:00-19:30", "18:00–21:00": "18:00-19:30",
  "18:30–21:30": "18:00-19:30",
  "19:30–21:00": "19:30-21:00",
};

function mapSlot(gio) {
  if (!gio) return null;
  for (const [key, val] of Object.entries(SLOT_MAP)) {
    if (gio.startsWith(key) || key.startsWith(gio.split("–")[0])) return val;
  }
  return null;
}

export function importScheduleFromExcel(file, assignments) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: "array", cellDates: true });
        const ws = wb.Sheets["Thời Khóa Biểu"] || wb.Sheets[wb.SheetNames[0]];
        if (!ws) throw new Error("Không tìm thấy sheet 'Thời Khóa Biểu'");

        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        const schedules = [];
        const assignmentMap = {};
        assignments.forEach((a) => {
          const key = `${a.program}|${a.grade}|${a.subject}|${a.hinhthuc}`;
          assignmentMap[key] = a;
        });

        // Build lookup by teacher+grade+subject+hinhthuc
        const teacherAssignmentMap = {};
        assignments.forEach((a) => {
          if (a.teacher) {
            const key = `${a.teacher}|${a.program}|${a.grade}|${a.subject}|${a.hinhthuc}`;
            teacherAssignmentMap[key] = a;
          }
        });

        let currentSection = "";

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0) continue;

          const first = String(row[0] || "").trim();

          // Detect section headers
          if (first.startsWith("▌")) {
            currentSection = first.replace("▌", "").trim();
            continue;
          }

          // Skip header rows
          if (first === "THỜI KHÓA BIỂU" || first.includes("Đã chốt") || first === "Cơ sở" || first === "Thời lượng") continue;
          if (row[1] === "Thứ" && row[2] === "Giờ") continue;

          const location = String(row[0] || "").trim();
          const thu = String(row[1] || "").trim();
          const gio = String(row[2] || "").trim();
          const khoi = String(row[4] || "").trim();
          const mon = String(row[5] || "").trim();
          const chuongTrinh = String(row[6] || "").trim();
          const giaoVien = String(row[7] || "").trim();
          const trangThai = String(row[8] || "").trim();

          const day = DAY_MAP[thu];
          const slot = mapSlot(gio);

          if (!day || !slot || !chuongTrinh || !mon || !khoi) continue;

          // Build hinhthuc
          let hinhthuc = "Online";
          if (location.includes("Times City") || currentSection.includes("TIMES CITY")) hinhthuc = "Offline Times City";
          else if (location.includes("Smart City") || currentSection.includes("SMART CITY")) hinhthuc = "Offline Smart City";
          else if (location.includes("Online") || currentSection.includes("ONLINE")) hinhthuc = "Online";

          const grade = parseInt(khoi.replace("L", ""), 10);

          // Try to find matching assignment
          let assignment = null;

          // First try by teacher match
          const teacherKey = `${giaoVien}|${chuongTrinh}|${grade}|${mon}|${hinhthuc}`;
          if (teacherAssignmentMap[teacherKey]) {
            assignment = teacherAssignmentMap[teacherKey];
          }

          // Fallback: match by program+grade+subject+hinhthuc (teacher may differ)
          if (!assignment) {
            const key = `${chuongTrinh}|${grade}|${mon}|${hinhthuc}`;
            assignment = assignmentMap[key];
          }

          if (!assignment) continue;

          // Skip rows with ❌ status
          if (trangThai.includes("❌") || trangThai.includes("Thiếu")) continue;

          schedules.push({
            id: `s_${Date.now()}_${i}`,
            assignmentId: assignment.id,
            day,
            slot,
          });
        }

        resolve(schedules);
      } catch (err) {
        reject(new Error("File không hợp lệ: " + err.message));
      }
    };
    reader.onerror = () => reject(new Error("Lỗi đọc file"));
    reader.readAsArrayBuffer(file);
  });
}
