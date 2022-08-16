const numberFormat = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD"
  }).format(value);


  export default numberFormat