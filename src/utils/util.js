const monthsMap = new Map();
monthsMap
  .set(1, "Jan")
  .set(1, "Feb")
  .set(2, "Mar")
  .set(3, "Apr")
  .set(4, "May")
  .set(5, "Jun")
  .set(6, "Jul")
  .set(7, "Aug")
  .set(8, "Sep")
  .set(9, "Oct")
  .set(10, "Nov")
  .set(11, "Dec");

export function getMonth(value) {
  return monthsMap.get(value);
}

