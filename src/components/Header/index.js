import {withRouter, Link} from 'react-router-dom'

import {FaShoppingCart} from 'react-icons/fa'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {myOrders} = value
      const totalQuantity = myOrders.length
      const {history} = props

      const onLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className="header-container">
          <Link to="/" className="link-item">
            <h1 className="header-heading">UNI Resto Cafe</h1>
          </Link>
          <p className="header-para">My orders</p>
          <Link to="/cart" className="link-item">
            <button
              type="button"
              className="cart-icon"
              data-testid="cart"
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
            </button>
          </Link>
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
