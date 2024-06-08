export const priceMask = (price) => {
  if (price) {
    return Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "symbol",
    }).format(price);
  }
  return price;
};
