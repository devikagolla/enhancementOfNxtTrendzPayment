// Write your code here
import Popup from 'reactjs-popup'

import Payment from '../Payment'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )

      return (
        <div className="amount-container">
          <h1 className="summary-heading">
            Order Total: <span className="amount">Rs {total}/-</span>
          </h1>
          <p className="para">{cartList.length} Items in cart</p>
          <Popup
            modal
            trigger={
              <button className="button" type="button">
                Checkout
              </button>
            }
            position="top left"
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
