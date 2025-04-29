import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api, { API_URL } from "../../apis/api";

interface CartItem {
    documentId: string;
    productId: string;
    name: string;
    price: number,
    quantity: number;
    totalPrice: number,
}

interface Cart {
    userId: string;
    cartItems?: CartItem[];
    totalQuantity: number | undefined;
    totalPrice: number | undefined;
}

interface CartContextType {
    cart: Cart | null;
    addToCart: (product: any) => void;
    updateToCart: (itemId: string, newQuantity: number) => void;
    fetchCart: () => void;
    deleteToCart: (documentId: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const user = JSON.parse(localStorage.getItem('user') as string)
    const cartId = user?.cart?.documentId;

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        if (!cartId) return;
        try {
            const res = await api.get(`/api/carts/${cartId}?populate[cartItems][populate][productId][populate]=image`);


            const rawCart = res.data.data;
            const totalQuantity = rawCart.cartItems?.reduce((total: number, item: CartItem) => total + item.quantity, 0) ?? 0;
            const totalPrice = rawCart.cartItems?.reduce((total: number, item: CartItem) => total + item.totalPrice, 0) ?? 0;

            setCart({
                ...rawCart,
                totalQuantity,
                totalPrice
            });
        } catch (err) {
            console.error('Fetch cart failed', err);
        }
    };

    const addToCart = async (product: any) => {
        if (!cartId) return;

        const cartItems = cart?.cartItems || [];
        const findCartItems = cartItems?.find((p: any) => p?.productId?.documentId === product?.documentId);
        const quantity = findCartItems ? findCartItems.quantity + 1 : 1;
        const totalPrice = product.price * quantity;

        try {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ
            if (!findCartItems) {
                await api.post(`/api/cart-items`, {
                    data: {
                        cartIds: cartId,
                        productId: product.documentId,
                        name: product.name,
                        price: product.price,
                        quantity: quantity,
                        totalPrice: totalPrice,
                    }
                });
            } else {
                // Nếu sản phẩm đã có, cập nhật quantity và totalPrice
                await api.put(`/api/cart-items/${findCartItems.documentId}`, {
                    data: {
                        quantity: quantity,
                        totalPrice: totalPrice,
                    }
                });
            }
            await fetchCart(); // Cập nhật lại giỏ hàng sau khi thêm
        } catch (err) {
            console.error('Add to cart failed', err);
        }
    };


    const deleteToCart = async (documentId: any) => {
        try {
            await api.delete(`/api/cart-items/${documentId}`)
            console.log("Xóa sản phẩm thành công");
            await fetchCart();
        } catch (error) {
            console.error('Delete to cart failed', error);
        }
    }

    const updateToCart = async (itemId: string, newQuantity: number) => {
        if (!cart || newQuantity < 1) return;
        const item = cart?.cartItems?.find(i => i.documentId === itemId);
        if (!item) return;
        const totalPrice = item.price * newQuantity;
        try {
            await api.put(`/api/cart-items/${itemId}`, {
                data: {
                    quantity: newQuantity,
                    totalPrice: totalPrice,
                }
            });
            await fetchCart(); // làm mới giỏ hàng
        } catch (error) {
            console.error("Lỗi cập nhật số lượng:", error);
        }
    };





    // const increaseQuantity = (productId: any) => {
    //     setCartItems(prevItems =>
    //         prevItems.map(item =>
    //             item.documentId === productId
    //                 ? { ...item, quantity: item.quantity + 1 }
    //                 : item
    //         )
    //     );
    // };

    // const decreaseQuantity = (productId: any) => {
    //     setCartItems(prevItems =>
    //         prevItems.map(item =>
    //             item.documentId === productId
    //                 ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
    //                 : item
    //         )
    //     );
    // };

    // const removeFromCart = (id: string) => {
    //     setCartItems((prev) => prev.filter((i) => i.documentId !== id));
    // };

    // const getTotalQuantity = () =>
    //     cartItems.reduce((total, item) => total + item.quantity, 0);

    // const getTotalPrice = () =>
    //     cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    // const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{
                // cartItems,
                // addToCart,
                // removeFromCart,
                // increaseQuantity,
                // decreaseQuantity,
                // getTotalQuantity,
                // getTotalPrice,
                // clearCart,
                cart,
                addToCart,
                updateToCart,
                fetchCart,
                deleteToCart
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
