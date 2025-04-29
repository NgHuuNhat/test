import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "../../apis/api";

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
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') as string));

    useEffect(() => {
        // Lắng nghe sự thay đổi của user trong localStorage và gọi fetchCart khi có sự thay đổi
        const handleStorageChange = () => {
            const newUser = JSON.parse(localStorage.getItem('user') as string);
            setUser(newUser);
        };

        window.addEventListener("loginFetchCart", handleStorageChange);

        // Xóa event listener khi component bị unmount
        return () => {
            window.removeEventListener("loginFetchCart", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (!user) {
            setCart(null);  // Nếu không có user, giỏ hàng sẽ được làm trống
        } else if (user?.cart?.documentId) {
            fetchCart();  // Nếu có user và cartId, fetch giỏ hàng
        }
    }, [user]);  // Khi user thay đổi, fetch lại giỏ hàng

    const fetchCart = async () => {
        const cartId = user?.cart?.documentId;
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
        if (!user?.cart?.documentId) return;

        const cartItems = cart?.cartItems || [];
        const findCartItems = cartItems?.find((p: any) => p?.productId?.documentId === product?.documentId);
        const quantity = findCartItems ? findCartItems.quantity + 1 : 1;
        const totalPrice = product.price * quantity;

        try {
            if (!findCartItems) {
                await api.post(`/api/cart-items`, {
                    data: {
                        cartIds: user.cart.documentId,
                        productId: product.documentId,
                        name: product.name,
                        price: product.price,
                        quantity: quantity,
                        totalPrice: totalPrice,
                    }
                });
            } else {
                await api.put(`/api/cart-items/${findCartItems.documentId}`, {
                    data: {
                        quantity: quantity,
                        totalPrice: totalPrice,
                    }
                });
            }
            await fetchCart();
        } catch (err) {
            console.error('Add to cart failed', err);
        }
    };

    const deleteToCart = async (documentId: any) => {
        try {
            await api.delete(`/api/cart-items/${documentId}`);
            console.log("Xóa sản phẩm thành công");
            await fetchCart();
        } catch (error) {
            console.error('Delete to cart failed', error);
        }
    };

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
            await fetchCart();
        } catch (error) {
            console.error("Lỗi cập nhật số lượng:", error);
        }
    };

    const clearCart = () => setCart(null);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateToCart,
            fetchCart,
            deleteToCart,
            clearCart
        }}>
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
