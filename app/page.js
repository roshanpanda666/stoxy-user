import React from 'react'
import ProductList from './components/productlist'
import Nav from './components/nav'

const page = () => {
  return (
    <div>
      user-stoxy
      <div>
        <Nav></Nav>
      </div>
      <div>
        <ProductList></ProductList>
      </div>
    </div>
  )
}

export default page
