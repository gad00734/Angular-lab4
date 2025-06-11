import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { map } from 'rxjs/operators';

interface CartItem extends IProduct {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(product: IProduct): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Item already in cart, increase quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity++;
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Item not in cart, add new item
      this.cartItemsSubject.next([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  increaseQuantity(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.map(item => {
      if (item.id === productId && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedItems);
  }

  decreaseQuantity(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0); // Remove if quantity drops to 0
    this.cartItemsSubject.next(updatedItems);
  }

  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  getCartItemCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }
} 