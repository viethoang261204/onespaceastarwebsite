import { DAYS, SLOTS } from "../../lib/constants";

const T = {
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  surfaceAlt: "#EFE8D9",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  ink: "#1A1A1A",
  muted: "#8A8377",
  inkSoft: "#4A4742",
};

export default function AvailabilityEditor({ availability, onToggle }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>
        Click ô để bật/tắt — ô xanh <span style={{ color: T.sage }}>xanh</span> = rảnh, trắng = bận.
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: 90, padding: "4px 6px", fontSize: 11, color: T.muted, textAlign: "left", fontWeight: 500, borderBottom: `1px solid ${T.borderStrong}`, fontFamily: "'Be Vietnam Pro', sans-serif" }}></th>
              {DAYS.map((d) => (
                <th key={d} style={{ textAlign: "center", padding: "4px 4px", fontSize: 12, color: T.inkSoft, fontWeight: 600, borderBottom: `1px solid ${T.borderStrong}`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot) => (
              <tr key={slot}>
                <td style={{ padding: "3px 6px", fontSize: 11, color: T.muted, fontFamily: "'Be Vietnam Pro', sans-serif", borderRight: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>
                  {slot}
                </td>
                {DAYS.map((day) => {
                  const available = !!availability?.[day]?.[slot];
                  return (
                    <td key={day} style={{ textAlign: "center", padding: 2 }}>
                      <button
                        onClick={() => onToggle(day, slot)}
                        title={`${day} ${slot}: ${available ? "Rảnh" : "Bận"}`}
                        style={{
                          width: 36,
                          height: 30,
                          borderRadius: 6,
                          border: `1.5px solid ${available ? T.sage : T.borderStrong}`,
                          background: available ? T.sageLight : T.surfaceAlt,
                          cursor: "pointer",
                          fontSize: 10,
                          fontWeight: available ? 600 : 400,
                          color: available ? T.sage : T.muted,
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          transition: "all 0.1s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {available ? "Rảnh" : "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
