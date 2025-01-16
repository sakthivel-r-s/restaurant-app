import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        decrementCartItemQuantity,
        incrementCartItemQuantity,
        removeCartItem,
      } = value

      const {menuDetails} = props
      const {
        dishId,
        quantity,
        dishImage,
        dishName,
        dishCurrency,
        dishPrice,
      } = menuDetails
      const onIncreaseQuantity = () => incrementCartItemQuantity(dishId)

      const onDecreaseQuantity = () => decrementCartItemQuantity(dishId)

      const onRemoveCartItem = () => removeCartItem(dishId)

      return (
        <li className="cart-list-item">
          <div className="cart-image-container">
            <img className="cart-image" src={dishImage} alt={dishName} />
          </div>
          <h1 className="cart-heading">{dishName}</h1>
          <div className="cart-price-container">
            <p className="dish-price">
              {dishCurrency} {parseFloat(dishPrice) * quantity}
            </p>
            <div className="quantity-container">
              <button
                type="button"
                onClick={onDecreaseQuantity}
                className="plus-button"
              >
                -
              </button>
              <p className="dish-quantity">{quantity}</p>
              <button
                type="button"
                onClick={onIncreaseQuantity}
                className="plus-button"
              >
                +
              </button>
            </div>
          </div>
          <button
            className="cart-remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <FaRegTrashAlt />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
