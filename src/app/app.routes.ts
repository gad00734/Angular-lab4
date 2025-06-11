import { Routes } from '@angular/router';
import { Products } from './components/products/products';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'products/:id', 
    loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails) 
  },
  { path: 'cart', 
    loadComponent: () => import('./components/cart/cart').then(m => m.CartComponent) 
  },
];
