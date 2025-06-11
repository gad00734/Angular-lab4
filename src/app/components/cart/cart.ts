import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/iproduct';

interface CartItem extends IProduct {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
} 