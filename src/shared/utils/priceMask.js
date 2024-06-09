export const priceMask = (price) => {
  if (price) {
    return Intl.NumberFormat("ru-RU", { maximumSignificantDigits: 3 }).format(price);
  }
  return price;
};

export const salaryToString = (from, to) => {
  if(from && to) {
    return `${priceMask(from)}- ${priceMask(to)}`
  }
  if(to) {
    return `до ${priceMask(to)}`
  }
  if(from) {
    return `от ${priceMask(from)}`
  }
}
