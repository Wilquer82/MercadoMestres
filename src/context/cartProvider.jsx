import React, { useState } from 'react';
import CartContext from './cartContext'
import PropTypes from 'prop-types';


export default function CartProvider({ children }) {
    const [cartItens, setCartItens] = useState([]);
    return (
        <CartContext.Provider value={{ cartItens, setCartItens }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};