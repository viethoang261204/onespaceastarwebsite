import { useState, useEffect, useCallback, useRef } from "react";
import seedData from "./data/seed.json";
import { loadState, saveState, exportExcel, importScheduleFromExcel } from "./lib/storage";
import { detectConflicts, detectAvailabilityViolations, assignmentStatus } from "./lib/validators";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import LoginScreen from "./components/LoginScreen";
import DashboardTab from "./components/tabs/DashboardTab";
import TeachersTab from "./components/tabs/TeachersTab";
import AssignmentsTab from "./components/tabs/AssignmentsTab";
import ScheduleTab from "./components/tabs/ScheduleTab";

const AUTH_KEY = "astar_v1_auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return !!localStorage.getItem(AUTH_KEY); } catch { return false; }
  });
  const [state, setState] = useState(() => loadState(seedData));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  // Autosave
  useEffect(() => {
    if (!isLoggedIn) return;
    saveState(state);
  }, [state, isLoggedIn]);

  const addToast = useCallback((message, type = "info") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Teacher lookup
  const teacherByName = {};
  state.teachers.forEach((t) => { teacherByName[t.name] = t; });

  // Global issue count
  const conflicts = detectConflicts(state.schedules, state.assignments);
  const availViolations = detectAvailabilityViolations(state.schedules, state.assignments, state.availability);
  const wrongAssignments = state.assignments.filter(
    (a) => assignmentStatus(a, teacherByName) !== "ok"
  );
  const issueCount = conflicts.length + availViolations.length + wrongAssignments.length;

  // Auth
  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, "1");
    setIsLoggedIn(true);
  };

  // Actions
  const setState_ = (updater) =>
    setState((prev) => (typeof updater === "function" ? updater(prev) : updater));

  const handleExport = () => {
    exportExcel(state);
    addToast("Đã xuất file Excel thành công!", "ok");
  };

  const handleImportSchedule = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const newSchedules = await importScheduleFromExcel(file, state.assignments);
      if (newSchedules.length === 0) {
        addToast("Không tìm thấy dữ liệu thời khóa biểu trong file.", "danger");
        e.target.value = "";
        return;
      }
      setState((prev) => ({ ...prev, schedules: newSchedules }));
      addToast(`Đã nhập ${newSchedules.length} slot thời khóa biểu!`, "ok");
    } catch (err) {
      addToast("Lỗi: " + err.message, "danger");
    }
    e.target.value = "";
  };

  // ---- Login screen ----
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ---- Render tab ----
  const tabProps = { state, setState: setState_, teacherByName, addToast };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            {...tabProps}
            conflicts={conflicts}
            availViolations={availViolations}
            wrongAssignments={wrongAssignments}
          />
        );
      case "teachers":
        return <TeachersTab {...tabProps} />;
      case "assignments":
        return <AssignmentsTab {...tabProps} />;
      case "schedule":
        return <ScheduleTab {...tabProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#F4EFE6",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <Header
        issueCount={issueCount}
        onExport={handleExport}
        onImportSchedule={handleImportSchedule}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main
        style={{
          flex: 1,
          padding: "28px 24px",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {renderTab()}
      </main>

      <Footer />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
