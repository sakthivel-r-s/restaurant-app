import React from 'react'

const CartContext = React.createContext({
  activeCategory: '',
  menuList: [],
  isLoading: true,
  myOrders: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
