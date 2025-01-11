import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import CategoryItem from '../CategoryItem'
import MenuItem from '../MenuItem'

class Home extends Component {
  state = {activeCategory: '', menuList: [], isLoading: true, myOrders: []}

  componentDidMount() {
    this.getDishDetails()
  }

  getDishDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const updatedManuList = data[0].table_menu_list.map(each => ({
      categoryDishes: each.category_dishes.map(eachCate => ({
        dishAvailability: eachCate.dish_Availability,
        dishType: eachCate.dish_Type,
        dishCalories: eachCate.dish_calories,
        dishCurrency: eachCate.dish_currency,
        dishDescription: eachCate.dish_description,
        dishId: eachCate.dish_id,
        dishImage: eachCate.dish_image,
        dishName: eachCate.dish_name,
        dishPrice: eachCate.dish_price,
        nextUrl: eachCate.nexturl,
        addonCat: eachCate.addonCat.map(eachAdd => ({
          addonCategory: eachAdd.addon_category,
          addonCategory_id: eachAdd.addon_category_id,
          addonSelection: eachAdd.addon_selection,
          nexturl: eachAdd.nexturl,
          addons: eachAdd.addons.map(addItem => ({
            dishAvailability: addItem.dish_Availability,
            dishType: addItem.dish_Type,
            dishCalories: addItem.dish_calories,
            dishCurrency: addItem.dish_currency,
            dishDescription: addItem.dish_description,
            dishId: addItem.dish_id,
            dishImage: addItem.dish_image,
            dishName: addItem.dish_name,
            dishPrice: addItem.dish_price,
          })),
        })),
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
    }))
    this.setState({
      activeCategory: updatedManuList[0].menuCategoryId,
      menuList: updatedManuList,
      isLoading: false,
    })
  }

  addCartItem = dish => {
    const {myOrders} = this.state
    const isAvailable = myOrders.find(each => each.dishId === dish.dishId)
    console.log(isAvailable)
    if (!isAvailable) {
      const newDish = {...dish, quantity: 1}
      this.setState({myOrders: [...myOrders, newDish]})
    } else {
      this.setState(prevState => ({
        myOrders: prevState.myOrders.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    }
  }

  removeCartItem = dish => {
    const {myOrders} = this.state
    const isAvailable = myOrders.find(each => each.dishId === dish.dishId)
    if (isAvailable) {
      this.setState(prevState => ({
        myOrders: prevState.myOrders
          .map(each =>
            each.dishId === dish.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(eachItem => eachItem.quantity > 0),
      }))
    }
  }

  updateActiveTab = id => {
    this.setState({activeCategory: id})
  }

  renderSuccessView = () => {
    const {activeCategory, menuList, myOrders} = this.state
    console.log(myOrders)
    const filteredList = menuList.filter(
      eachItem => eachItem.menuCategoryId === activeCategory,
    )
    const {categoryDishes} = filteredList[0]

    return (
      <>
        <ul className="tab-container">
          {menuList.map(eachCategory => (
            <CategoryItem
              activeCategory={activeCategory}
              categoryDetails={eachCategory}
              key={eachCategory.menuCategory}
              updateActiveTab={this.updateActiveTab}
            />
          ))}
        </ul>
        <ul className="dish-container">
          {categoryDishes.map(eachMenu => (
            <MenuItem
              key={eachMenu.dishId}
              myOrders={myOrders}
              menuDetails={eachMenu}
              addCartItem={this.addCartItem}
              removeCartItem={this.removeCartItem}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, myOrders} = this.state

    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <div className="bg-container">
        <Header myOrders={myOrders} />
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default Home
