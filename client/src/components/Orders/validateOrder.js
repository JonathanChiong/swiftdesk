export const validateOrder = async (order, products) => {
  const foundProducts = {};

  //Result array - will contain combined orders
  const result = [];

  //Loop through orders array, combining similar product and their quantity
  order.forEach((item) => {
    if (foundProducts[item.product]) {
      const index = foundProducts[item.product] - 1;
      const foundItem = result[index];
      const newValue = {
        ...foundItem,
        quantity: parseInt(foundItem.quantity) + parseInt(item.quantity),
      };
      result[index] = newValue;
    } else {
      foundProducts[item.product] = result.length + 1;
      result.push(item);
    }
  });

  //Check if order quantity exceeds available stocks
  for (let el of result) {
    const currentProduct = await products.find((i) => i.product === el.product);

    if (el.quantity > currentProduct.stocks) {
      return false;
    } else {
      return true;
    }
  }
};
