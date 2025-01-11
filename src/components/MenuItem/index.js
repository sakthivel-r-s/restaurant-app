import './index.css'

const MenuItem = props => {
  const {menuDetails, addCartItem, removeCartItem, myOrders} = props
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
    dishId,
  } = menuDetails

  const onIncreaseQuantity = () => addCartItem(menuDetails)

  const onDecreaseQuantity = () => removeCartItem(menuDetails)

  const getQuantity = () => {
    const cartItem = myOrders.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className="menu-container">
      <div className="symbol-container">
        <div
          className="symbol-border"
          style={{border: `1px solid ${dishType === 1 ? 'red' : 'green'}`}}
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
            <div className="quantity-container">
              <button
                type="button"
                onClick={onDecreaseQuantity}
                className="plus-button"
              >
                -
              </button>
              <p className="dish-quantity">{getQuantity().toString()}</p>
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
