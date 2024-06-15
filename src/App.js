import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const item = cartList.filter(each => each.id !== id)
    this.setState({cartList: item})
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          const updatequantity = each.quantity + 1
          return {...each, quantity: updatequantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const itemFind = cartList.find(product => product.id === id)
    if (itemFind.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === id) {
            const updatequantity = each.quantity - 1
            return {...each, quantity: updatequantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const itemFind = cartList.find(each => each.id === product.id)
    if (itemFind) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === product.id) {
            const updatequantity = each.quantity + product.quantity
            return {...each, quantity: updatequantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prev => ({cartList: [...prev.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
