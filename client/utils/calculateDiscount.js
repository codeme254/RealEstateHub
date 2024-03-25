const calculateDiscount = (regularPrice, discountedPrice) => {
  let discount = regularPrice - discountedPrice;
  return parseInt((discount / regularPrice) * 100);
};
export default calculateDiscount;
