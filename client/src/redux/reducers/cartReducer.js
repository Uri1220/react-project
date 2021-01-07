import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT } from "../constants/cartConstans";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {

  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      ////////////////Если повторно выбирать тот же прод
      ///кол-во изменяется на последнее
      const product = state.cartItems.find(x => x.productId === item.productId);
      // нашли совпадающий product
      if (product) {
        return {
          cartItems:
            state.cartItems.map(x => x.productId === product.productId ? item : x)
            //заменили старый на новый item иначе оставили старый x
        };
      }
      /////////////////////////////////////////////
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(x => x.productId !== action.payload) };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shipping: action.payload };

    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };

    default:
      return state
  }
}

export { cartReducer }