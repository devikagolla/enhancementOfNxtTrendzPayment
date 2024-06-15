import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisplayed: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisplayed: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisplayed: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisplayed: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisplayed: false,
  },
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onPlaceOrder = () => setIsOrderPlaced(true)

  const getTotalPrice = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPaymentMethodsInput = () => (
    <ul className="payment-method">
      {paymentOptionsList.map(each => (
        <li key={each.id} className="payment-method-input">
          <input
            id={each.id}
            type="radio"
            name="paymentMethod"
            disabled={each.isDisplayed}
            onChange={updatePaymentMethod}
          />
          <label htmlFor={each.id}>{each.displayText}</label>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="payments">
      {isOrderPlaced ? (
        <p>Your order has been placed successfully</p>
      ) : (
        <>
          <h1>Payments Details</h1>
          <p>Payment Method</p>
          {renderPaymentMethodsInput()}
          <div>
            <p>Order details</p>
            <p>Quantity: {cartList.length}</p>
            <p>Total Price: RS {getTotalPrice()}/- </p>
          </div>
          <button
            disabled={paymentMethod === ''}
            type="button"
            onClick={onPlaceOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
