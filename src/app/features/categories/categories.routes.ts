import { Routes } from "@angular/router";

export const CATEGORIES_ROUTES: Routes = [

     {
        path: "",
        loadComponent: () => import("./pages/categories-page/categories-page").then((m) =>m.CategoriesPage )
    },
     {
        path: "specific-category/:catId",
        loadComponent: () => import("./pages/single-category/single-category.component").then((m) =>m.SingleCategoryComponent )
    },

]