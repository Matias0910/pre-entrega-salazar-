import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localData = window.localStorage.getItem('techstore_cart');
            if (localData) {
                const parsed = JSON.parse(localData);
                return parsed.map(prod => ({
                    ...prod,
                    precio: Number(prod.precio) || 0,
                    cantidad: parseInt(prod.cantidad, 10) || 1
                }));
            }
            return [];
        } catch (error) {
            window.console.error("Error leyendo localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('techstore_cart', JSON.stringify(cart));
        } catch (error) {
            window.console.error("Error guardando en localStorage:", error);
        }
    }, [cart]);

    const addToCart = (item, quantity) => {
        const precioNumero = Number(item.precio) || 0;
        const cantidadNumero = parseInt(quantity, 10) || 1;

        setCart(prevCart => {
            const itemExists = prevCart.find(prod => prod.id === item.id);
            if (itemExists) {
                return prevCart.map(prod => 
                    prod.id === item.id 
                        ? { ...prod, cantidad: (parseInt(prod.cantidad, 10) || 0) + cantidadNumero } 
                        : prod
                );
            }
            return [...prevCart, { ...item, precio: precioNumero, cantidad: cantidadNumero }];
        });
    };

    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(prod => prod.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        const cantidadNumerica = parseInt(newQuantity, 10) || 1;
        if (cantidadNumerica < 1) return;
        setCart(prevCart => prevCart.map(prod => 
            prod.id === id ? { ...prod, cantidad: cantidadNumerica } : prod
        ));
    };

    const clearCart = () => {
        window.localStorage.removeItem('techstore_cart');
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce((total, prod) => total + (parseInt(prod.cantidad, 10) || 0), 0);
    };

    const getCartTotal = () => {
        const totalCalculado = cart.reduce((total, prod) => {
            const pre = Number(prod.precio) || 0;
            const cant = Number(prod.cantidad, 10) || 0;
            return total + (pre * cant);
        }, 0);
        return isNaN(totalCalculado) ? 0 : totalCalculado;
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeItem, 
            updateQuantity, 
            clearCart, 
            getCartQuantity, 
            getCartTotal 
        }}>
            {children}
        </CartContext.Provider>
    );
};