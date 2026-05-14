import { DAYS, SLOTS } from "../../lib/constants";

const T = {
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  border: "#E0D5BD",
  muted: "#8A8377",
};

export default function AvailabilityHeatmap({ availability, compact }) {
  if (!availability || Object.keys(availability).length === 0) {
    return (
      <div style={{ fontSize: 11, color: T.muted, fontStyle: "italic" }}>
        Chưa có dữ liệu lịch rảnh
      </div>
    );
  }

  const showDays = compact ? DAYS : DAYS;
  const showSlots = compact ? SLOTS : SLOTS;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: compact ? 50 : 80, padding: compact ? "2px 4px" : "4px 6px", fontSize: 10, color: T.muted, textAlign: "left", fontWeight: 500, borderBottom: `1px solid ${T.border}`, fontFamily: "'Be Vietnam Pro', sans-serif" }}></th>
            {showDays.map((d) => (
              <th key={d} style={{ textAlign: "center", padding: compact ? "2px 2px" : "4px 4px", fontSize: compact ? 9 : 11, color: T.muted, fontWeight: 500, borderBottom: `1px solid ${T.border}`, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showSlots.map((slot) => (
            <tr key={slot}>
              <td style={{ padding: compact ? "1px 4px" : "2px 6px", fontSize: compact ? 8 : 10, color: T.muted, fontFamily: "'Be Vietnam Pro', sans-serif", whiteSpace: "nowrap" }}>
                {slot}
              </td>
              {showDays.map((day) => {
                const available = !!availability?.[day]?.[slot];
                return (
                  <td key={day} style={{ textAlign: "center", padding: 1 }}>
                    <div
                      style={{
                        width: compact ? 12 : 16,
                        height: compact ? 12 : 16,
                        borderRadius: 3,
                        background: available ? T.sage : T.border,
                        margin: "0 auto",
                        transition: "background 0.1s",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
