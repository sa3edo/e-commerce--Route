import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'details/:productId/:slug',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'cart',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'checkout/:cartId',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'allorders',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'brands/specific-brand/:brandId',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'categories/specific-category/:catId',
  //   renderMode: RenderMode.Client
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
