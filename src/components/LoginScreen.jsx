import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
};

const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      onLogin({ username: ADMIN_USER });
    } else {
      setError("Tài khoản hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 20,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: T.ink }}>
              OneSpace
            </span>
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 26, color: T.accent }}>
              {" "}Astar
            </span>
          </div>
          <div style={{ fontSize: 12, color: T.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Hệ thống phân công &amp; xếp lịch giảng dạy
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: T.border, marginBottom: 28 }} />

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.inkSoft, marginBottom: 6 }}>
              Tài khoản
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="Nhập tài khoản"
              autoComplete="username"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1.5px solid ${error ? T.danger : T.border}`,
                borderRadius: 10,
                fontSize: 14,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: T.ink,
                background: T.surface,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.inkSoft, marginBottom: 6 }}>
              Mật khẩu
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 12px",
                  border: `1.5px solid ${error ? T.danger : T.border}`,
                  borderRadius: 10,
                  fontSize: 14,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: T.ink,
                  background: T.surface,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: T.muted,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: "8px 12px",
                background: T.dangerLight,
                border: `1px solid ${T.danger}`,
                borderRadius: 8,
                fontSize: 12,
                color: T.danger,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px",
              background: T.accent,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            <LogIn size={16} />
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
