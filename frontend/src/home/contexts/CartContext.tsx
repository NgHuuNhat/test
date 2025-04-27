import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    documentId: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: any) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.documentId === product.documentId);
            if (exist) {
                return prev.map(item =>
                    item.documentId === product.documentId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (productId: any) => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.documentId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      };
    
      const decreaseQuantity = (productId: any) => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.documentId === productId
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          )
        );
      };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.documentId !== id));
    };

    const getTotalQuantity = () =>
        cartItems.reduce((total, item) => total + item.quantity, 0);

    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                getTotalQuantity,
                getTotalPrice,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
