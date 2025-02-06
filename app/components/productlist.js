"use client"
import React, { useState, useEffect } from 'react';

const getProducts = async () => {
    try {
        let response = await fetch("/api/products", { cache: 'no-cache' });
        let data = await response.json();
        return data.success ? data.result : [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

const Productlist = () => {
    const [productlist, setProductList] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const products = await getProducts();
            setProductList(products);
        };
        loadProducts();
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-center items-center text-2xl text-cyan-500 font-semibold mb-4'>
                Products Available
            </div>

            <div className='grid grid-cols-3 sm:grid-cols-3 text-center font-medium border-b-2 border-cyan-400 pb-2'>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
            </div>

            {Array.isArray(productlist) && productlist.length > 0 ? (
                productlist.map((item, index) => (
                    <div key={index} className='grid grid-cols-3 sm:grid-cols-3 text-center py-2 border-b border-gray-300'>
                        <div className='px-2'>{item.brand}</div>
                        <div className='px-2 text-cyan-600'>{item.price}</div>
                        <div className='px-2'>{item.quantity}</div>
                    </div>
                ))
            ) : (
                <div className='text-center text-gray-500 mt-4'>No products available</div>
            )}
        </div>
    );
};

export default Productlist;
