import {Component} from 'react'

import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import CartContext from './context/CartContext'

import './App.css'

// write your code here

class App extends Component {
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
    if (!isAvailable) {
      this.setState({myOrders: [...myOrders, dish]})
    } else {
      this.setState(prevState => ({
        myOrders: prevState.myOrders.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + dish.quantity}
            : each,
        ),
      }))
    }
  }

  removeCartItem = dishId => {
    const {myOrders} = this.state
    const filteredList = myOrders.filter(each => each.dishId !== dishId)
    this.setState({myOrders: filteredList})
  }

  updateActiveTab = id => {
    this.setState({activeCategory: id})
  }

  removeAllCartItems = () => {
    this.setState({myOrders: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      myOrders: prevState.myOrders.map(each =>
        each.dishId === dishId ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      myOrders: prevState.myOrders
        .map(each =>
          each.dishId === dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        )
        .filter(each => each.quantity > 0),
    }))
  }

  render() {
    const {activeCategory, menuList, isLoading, myOrders} = this.state

    return (
      <CartContext.Provider
        value={{
          activeCategory,
          menuList,
          isLoading,
          myOrders,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          updateActiveTab: this.updateActiveTab,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/notfound" component={NotFound} />
            <Redirect to="notfound" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}
export default App
