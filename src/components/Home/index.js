import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import CategoryItem from '../CategoryItem'
import MenuItem from '../MenuItem'

import CartContext from '../../context/CartContext'

class Home extends Component {
  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {activeCategory, menuList, isLoading} = value

          if (isLoading) {
            return this.renderLoadingView()
          }

          const filteredList = menuList.filter(
            eachItem => eachItem.menuCategoryId === activeCategory,
          )
          const {categoryDishes} = filteredList[0]

          return (
            <div className="bg-container">
              <Header />
              <ul className="tab-container">
                {menuList.map(eachCategory => (
                  <CategoryItem
                    categoryDetails={eachCategory}
                    key={eachCategory.menuCategory}
                  />
                ))}
              </ul>
              <ul className="dish-container">
                {categoryDishes.map(eachMenu => (
                  <MenuItem key={eachMenu.dishId} menuDetails={eachMenu} />
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
