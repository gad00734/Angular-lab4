import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  @Input() product!: IProduct;

  constructor(private router: Router) { }

  getStars(rate: number): string[] {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars: string[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (halfStar) {
      stars.push('☆'); // This is a placeholder for a half-star icon or a different visual representation.
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    return stars;
  }

  getStockStatus(): string {
    return this.product.stock > 0 ? 'In stock' : 'Out of stock';
  }

  getStockStatusColor(): string {
    return this.product.stock > 0 ? 'green' : 'red';
  }

  viewProductDetails() {
    this.router.navigate(['/products', this.product.id]);
  }
} 