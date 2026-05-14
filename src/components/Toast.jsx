import { useEffect } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

const T = {
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
};

const icons = {
  ok: <CheckCircle size={16} color={T.sage} />,
  danger: <XCircle size={16} color={T.danger} />,
  info: <Info size={16} color={T.teal} />,
};

const bgColors = {
  ok: T.sageLight,
  danger: T.dangerLight,
  info: T.tealLight,
};

const borderColors = {
  ok: T.sage,
  danger: T.danger,
  info: T.teal,
};

export default function Toast({ toasts, onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 1000,
        maxWidth: 360,
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss?.(toast.id);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        background: bgColors[toast.type] || T.tealLight,
        border: `1px solid ${borderColors[toast.type] || T.teal}`,
        borderRadius: 10,
        padding: "12px 14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 13,
        color: borderColors[toast.type] || T.teal,
        animation: "slideIn 0.2s ease",
      }}
    >
      <div style={{ marginTop: 1, flexShrink: 0 }}>
        {icons[toast.type] || icons.info}
      </div>
      <div style={{ flex: 1 }}>{toast.message}</div>
    </div>
  );
}
