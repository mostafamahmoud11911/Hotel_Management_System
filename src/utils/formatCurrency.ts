const formatted = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatCurrency = (num: number) => {
  return formatted.format(num);
};


export default formatCurrency
