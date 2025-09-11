import { Routes } from "@angular/router";

export const BRANDS_ROUTES: Routes = [

    {
        path: "",
        loadComponent: () => import("./pages/brands-page/brands-page").then((m) => m.BrandsPage)
    },
    {
        path: "specific-brand/:brandId",
        loadComponent: () => import("./pages/single-brand/single-brand.component").then((m) => m.SingleBrandComponent)
    },

]