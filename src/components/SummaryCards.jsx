/**
 * Fila de tarjetas resumen (estilo KPI).
 * cards: [{ label, value, icon, color }]
 * color puede ser: "blue" | "green" | "orange" | "purple"
 */
const COLOR_MAP = {
  blue: { bg: "var(--info-bg)", text: "var(--info-text)" },
  green: { bg: "var(--success-bg)", text: "var(--success-text)" },
  orange: { bg: "var(--warning-bg)", text: "var(--warning-text)" },
  purple: { bg: "var(--purple-bg)", text: "var(--purple-text)" },
};

function SummaryCards({ cards = [] }) {
  return (
    <div className="summary-cards">
      {cards.map((card, index) => {
        const palette = COLOR_MAP[card.color] || COLOR_MAP.blue;

        return (
        <div className="summary-card" key={`${card.label}-${index}`}>
          <div
            className="summary-card-icon"
            style={{ background: palette.bg, color: palette.text }}
          >
            {card.icon}
          </div>
          <div>
            <p className="summary-card-label">{card.label}</p>
            <p className="summary-card-value">{card.value}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
