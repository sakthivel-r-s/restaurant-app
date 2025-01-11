import './index.css'

const CategoryItem = props => {
  const {activeCategory, categoryDetails, updateActiveTab} = props
  const {menuCategoryId, menuCategory} = categoryDetails

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
}

export default CategoryItem
