const T = {
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
};

const CONFIG = {
  ok: { label: "Hợp lệ", bg: T.sageLight, color: T.sage },
  missing: { label: "Thiếu GV", bg: T.dangerLight, color: T.danger },
  "wrong-subject": { label: "Sai môn", bg: T.amberLight, color: T.amber },
  "wrong-location": { label: "Sai cơ sở", bg: T.amberLight, color: T.amber },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG.missing;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        fontFamily: "'Be Vietnam Pro', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
