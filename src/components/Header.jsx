import { useState, useRef, useEffect } from "react";
import { Download, Upload, AlertTriangle, ChevronDown } from "lucide-react";

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
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
};

export default function Header({ issueCount, onExport, onImportSchedule, activeTab, onTabChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const tabs = [
    { id: "dashboard", label: "Tổng quan" },
    { id: "teachers", label: "Giáo viên" },
    { id: "assignments", label: "Phân công" },
    { id: "schedule", label: "Thời khóa biểu" },
  ];

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      style={{
        background: T.surface,
        borderBottom: `1px solid ${T.border}`,
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 600,
              color: T.ink,
            }}
          >
            OneSpace
          </span>
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 22,
              fontWeight: 400,
              color: T.accent,
            }}
          >
            Astar
          </span>
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: T.muted,
              letterSpacing: "0.08em",
              marginLeft: 12,
              textTransform: "uppercase",
            }}
          >
            Hệ thống phân công & xếp lịch giảng dạy
          </span>
        </div>

        {/* Right: issue badge + data menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {issueCount > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: T.dangerLight,
                border: `1px solid ${T.danger}`,
                borderRadius: 20,
                padding: "4px 12px",
                color: T.danger,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <AlertTriangle size={13} />
              {issueCount} vấn đề
            </div>
          )}

          {/* Data menu */}
          <div style={{ position: "relative" }} ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: T.surfaceAlt,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                padding: "7px 12px",
                fontSize: 13,
                fontWeight: 500,
                color: T.inkSoft,
                cursor: "pointer",
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}
            >
              Dữ liệu
              <ChevronDown
                size={14}
                style={{
                  transform: menuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 6px)",
                  background: T.surface,
                  border: `1px solid ${T.borderStrong}`,
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  minWidth: 200,
                  zIndex: 200,
                }}
              >
                <MenuBtn
                  icon={<Download size={14} />}
                  label="Xuất Excel"
                  onClick={() => { onExport(); setMenuOpen(false); }}
                />
                <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", cursor: "pointer", fontSize: 13, color: T.inkSoft, fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <Upload size={14} />
                  Nhập TKB Excel
                  <input type="file" accept=".xlsx,.xls" style={{ display: "none" }} onChange={e => { onImportSchedule(e); setMenuOpen(false); }} />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <nav style={{ display: "flex", gap: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? T.accent : T.muted,
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${T.accent}` : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              transition: "color 0.15s, border-color 0.15s",
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function MenuBtn({ icon, label, onClick, danger }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: "9px 14px",
        background: hover ? (danger ? T.dangerLight : T.surfaceAlt) : "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        color: danger ? T.danger : T.inkSoft,
        fontFamily: "'Be Vietnam Pro', sans-serif",
        textAlign: "left",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
