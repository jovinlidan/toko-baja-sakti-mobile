export default {
  priceRegex: /^\d+\.?\d{0,999999}?$/,
  capitalCaseRegex: /([A-Z])/,
  lowerCaseRegex: /[a-z]/,
  specialCharRegex: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  onlyNumberRegex: /[0-9]/,
  currencyRegex: {
    default: /[^0-9.]/,
    global: /[^0-9.]/g,
  },
};
