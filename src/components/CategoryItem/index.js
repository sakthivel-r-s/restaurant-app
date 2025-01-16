import CartContext from '../../context/CartContext'

import './index.css'

const CategoryItem = props => {
  const {categoryDetails} = props
  const {menuCategoryId, menuCategory} = categoryDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {activeCategory, updateActiveTab} = value
        const customClass =
          activeCategory === categoryDetails.menuCategoryId
            ? 'custom-tab selected'
            : 'custom-tab'

        const onUpate = () => {
          updateActiveTab(menuCategoryId)
        }
        return (
          <li className="category-list-item" onClick={onUpate}>
            <button type="button" className={customClass}>
              {menuCategory}
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CategoryItem
