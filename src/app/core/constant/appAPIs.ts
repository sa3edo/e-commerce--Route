import { environment } from "../../../environments/environment";

export const APP_APIS = {
    // Authentication
    registerApi:`${environment.apiUrl}/auth/signup`,
    loginApi:`${environment.apiUrl}/auth/signin`,

    // Products
    getAllProducts:`${environment.apiUrl}/products`,
    
    // Categories
    getAllCategories :`${environment.apiUrl}/categories`,
    
    // Cart
    Cart :`${environment.apiUrl}/cart`,
    
} 