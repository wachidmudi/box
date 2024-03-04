function formatDate(date: Date) {
  let month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

export function currentDate() {
  return formatDate(new Date());
}

export function tomorrowDate() {
  let ms = new Date().getTime() + 86400000;
  let tomorrow = new Date(ms);
  return formatDate(tomorrow);
}
