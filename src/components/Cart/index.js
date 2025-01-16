import CartContext from '../../context/CartContext'

import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {myOrders, removeAllCartItems} = value

      const getTotalPrice = () => {
        const total = myOrders.reduce(
          (acc, item) => item.quantity * item.dishPrice + acc,
          0,
        )
        return total
      }

      const onRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-bg-container">
          <Header />
          <div className="cart-Summary-container">
            <p className="Summary-text">Order Summary</p>
            <button
              onClick={onRemoveAll}
              className="remove-button"
              type="button"
            >
              Remove All
            </button>
          </div>
          {getTotalPrice() > 0 ? (
            <>
              <ul className="cart-list">
                {myOrders.map(eachItem => (
                  <CartItem key={eachItem.dishId} menuDetails={eachItem} />
                ))}
              </ul>
              <hr />
              <p className="total-price">
                Total price:{' '}
                <span className="total-span">{getTotalPrice()}</span>
              </p>
            </>
          ) : (
            <div>
              <img
                className="empty-cart"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty-cart"
              />
              <h1 className="empty-heading">Your cart is Empty</h1>
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
