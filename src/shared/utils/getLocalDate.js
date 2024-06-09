export const isDateValid = (val) => !Number.isNaN(new Date(val).valueOf());

export const getLocalDate = (date) => {
  if (date && isDateValid(date)) {
    return new Date(date).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  } else {
    console.error("Date is not valid");
    return "";
  }
};
