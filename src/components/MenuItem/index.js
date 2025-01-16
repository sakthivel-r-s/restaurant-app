import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const MenuItem = props => {
  const {menuDetails} = props
  const {
    dishAvailability,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    addonCat,
  } = menuDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => setQuantity(prev => prev + 1)

  const onDecreaseQuantity = () =>
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  const onAddtoCartItem = () => addCartItem({...menuDetails, quantity})

  return (
    <div className="menu-container">
      <div className="symbol-container">
        <div
          className="symbol-border"
          style={{
            border: `1px solid ${dishType === 1 ? 'red' : 'green'}`,
          }}
        >
          <div
            className="style-round"
            style={{
              border: `1px solid ${dishType === 1 ? 'red' : 'green'}`,
              backgroundColor: `${dishType === 1 ? 'red' : 'green'}`,
            }}
          />
        </div>
      </div>
      <div className="menu-details-container">
        <h1 className="dish-heading">{dishName}</h1>
        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="menu-description">{dishDescription}</p>
        {dishAvailability ? (
          <>
            <div className="menu-quantity-container">
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
            {addonCat.length !== 0 ? (
              <p className="customizations">Customizations available</p>
            ) : null}
            {quantity > 0 && (
              <button
                onClick={onAddtoCartItem}
                className="add-to-cart-button"
                type="button"
              >
                ADD TO CART
              </button>
            )}
          </>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>
      <div className="calories-container">
        <p className="calories">{dishCalories} calories</p>
      </div>
      <div className="menu-image-container">
        <img className="menu-image" src={dishImage} alt={dishName} />
      </div>
    </div>
  )
}

export default MenuItem
