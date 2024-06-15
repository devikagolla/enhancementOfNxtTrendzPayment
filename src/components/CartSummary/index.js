// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const renderTotal = () => {
        let total = 0
        cartList.forEach(each => {
          total += each.price * each.quantity
        })
        return total
      }

      return (
        <div className="amount-container">
          <h1 className="summary-heading">
            Order Total: <span className="amount">Rs {renderTotal()}/-</span>
          </h1>
          <p className="para">{cartList.length} Items in cart</p>
          <button className="button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
