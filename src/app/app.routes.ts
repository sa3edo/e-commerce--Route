import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout/main-layout';
import { userGuard } from './core/guards/user-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [userGuard],
        component: AuthLayout,

        loadChildren: () => import("./features/auth/components/auth.routes").then((m) => m.AUTH_ROUTES)
    },
    {
        path: 'home',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                loadChildren: () => import("./features/home/home.routes").then((m) => m.HOME_ROUTES)
            },
            {
                path: "cart",
                loadChildren: () => import("./features/cart/cart.routes").then((m) => m.CART_ROUTES)
            },
            {
                path: "categories",
                loadChildren: () => import("./features/categories/categories.routes").then((m) => m.CATEGORIES_ROUTES)
            },
            {
                path: "products",
                loadChildren: () => import("./features/products/products.routes").then((m) => m.PRODUCTS_ROUTES)
            },
            {
                path: "details/:productId",
                loadComponent: () => import("./features/products/pages/product-details/product-details").then((m) => m.ProductDetails)
            },
            {
                path: "details/:productId/:slug",
                loadComponent: () => import("./features/products/pages/product-details/product-details").then((m) => m.ProductDetails)
            },
            {
                path: "brands",
                loadChildren: () => import("./features/brands/brands.routes").then((m) => m.BRANDS_ROUTES)
            }
        ]
    }
];
