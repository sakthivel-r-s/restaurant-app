import {FaShoppingCart} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const {myOrders} = props

  const totalQuantity = myOrders.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <div className="header-container">
      <h1 className="header-heading">UNI Resto Cafe</h1>
      <p className="header-para">My orders</p>
      <div
        className="cart-icon"
        style={{position: 'relative', display: 'inline-block'}}
      >
        <FaShoppingCart size={24} style={{color: 'black'}} />

        {totalQuantity > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {totalQuantity}
          </span>
        )}
      </div>
    </div>
  )
}

export default Header
