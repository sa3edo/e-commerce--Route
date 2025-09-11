import { Routes } from "@angular/router";

export const PAYMENT_ROUTES: Routes = [

     {
        path: "",
        loadComponent: () => import("./pages/check-out-page/check-out-page.component").then((m) =>m.CheckOutPageComponent )
    },

]