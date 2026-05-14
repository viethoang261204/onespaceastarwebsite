const T = {
  bg: "#F4EFE6",
  muted: "#8A8377",
  border: "#E0D5BD",
};

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        borderTop: `1px solid ${T.border}`,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: T.bg,
      }}
    >
      <span style={{ fontSize: 12, color: T.muted, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        © 2026 OneSpace Astar — Hà Nội
      </span>
      <span style={{ fontSize: 12, color: T.muted, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        Hệ thống phân công &amp; xếp lịch giảng dạy STEM Cambridge
      </span>
    </footer>
  );
}
