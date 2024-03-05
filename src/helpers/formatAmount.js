let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
});

const formatAmount = (amount) => {
    return dollarIndianLocale.format(amount);
};

export default formatAmount;
