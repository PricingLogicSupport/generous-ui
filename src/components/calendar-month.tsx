export interface CalendarMonthProps {
  month: Date;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

function sameDate(a?: Date, b?: Date) {
  return Boolean(
    a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  );
}

export function CalendarMonth({ month, selectedDate, onDateSelect }: CalendarMonthProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const blanks = firstDay.getDay();
  const monthLabel = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(firstDay);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="gui-calendar" aria-label={monthLabel}>
      <h2>{monthLabel}</h2>
      <div className="gui-calendar-grid">
        {weekdays.map((day) => (
          <span key={day} className="gui-calendar-weekday">
            {day}
          </span>
        ))}
        {Array.from({ length: blanks }).map((_, index) => (
          <span key={`blank-${index}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(year, monthIndex, index + 1);
          const selected = sameDate(date, selectedDate);
          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={selected}
              onClick={() => onDateSelect?.(date)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
}
