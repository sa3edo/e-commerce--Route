import { environment } from "../../../environments/environment";

export const APP_APIS = {
    // Authentication
    registerApi:`${environment.apiUrl}/auth/signup`,
    loginApi:`${environment.apiUrl}/auth/signin`,

    // Products
    getAllProducts:`${environment.apiUrl}/products`,
    
    // Brands
    getAllBrands:`${environment.apiUrl}/brands`,
    
    // Categories
    getAllCategories :`${environment.apiUrl}/categories`,
    
    // SubCategories
    getAllSubCategories :`${environment.apiUrl}/subcategories`,
    
    // Cart
    Cart :`${environment.apiUrl}/cart`,
    
    //Orders
    allOrders :`${environment.apiUrl}/orders/user`,
    // Payment
    onlinePayment :`${environment.apiUrl}/orders/checkout-session`,
    cashPayment :`${environment.apiUrl}/orders`,
    
} 