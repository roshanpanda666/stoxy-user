import React from 'react'

import Nav from '../components/nav'
import ProductList_p from '../components/ProductList_p'


const page = () => {
  return (
    <div>
      <div>
        <Nav></Nav>
      </div>
      <div>
       <ProductList_p></ProductList_p>
      </div>
    </div>
  )
}

export default page
