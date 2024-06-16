export const dateWithoutTimezone = (date) => {
  if(date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }
  return  date
}

export const dateWithTimezone = (date) => {
  if(date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }
  return  date
}


export const getDateTimeStringFromDate = (date, timeIsStartOrEndOfDay) => {
  const rightDate = dateWithoutTimezone(date)
  const y = rightDate.getFullYear();
  const m = rightDate.getMonth() + 1;
  const d = rightDate.getDate();
  const fullDate = `${y}-${m >= 10 ? m : "0" + m}-${d >= 10 ? d : "0" + d}`;

  if (!timeIsStartOrEndOfDay) {
    const hour = rightDate.getHours();
    const minutes = rightDate.getMinutes();

    return `${fullDate} ${hour >= 10 ? hour : "0" + hour}:${
      minutes >= 10 ? minutes : "0" + minutes
    }`;
  }

  const fullTime = timeIsStartOrEndOfDay === "start" ? "00:00" : "23:59";

  return `${fullDate} ${fullTime}`;
}
