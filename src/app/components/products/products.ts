import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card'; // Import ProductCard
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products', // Component Directives: Selector
  imports: [CommonModule, FormsModule, ProductCard], // Add ProductCard here
  templateUrl: './products.html',
  // template: ``,
  styleUrl: './products.css',
  // styles: ``
  // styleUrls: []

  // Bootstrap
  // ng-bootstrap
  // https://ng-bootstrap.github.io/#/getting-started
  // PrimeNG
  // https://primeng.org/installation
  // Angular Material
  // https://material.angular.dev/guide/getting-started

  // View Encapsulation
  // encapsulation: ViewEncapsulation.Emulated
  // <h1 _ngcontent-hash></h1>
  // h1[_ngcontent-hash] css rule

  // encapsulation: ViewEncapsulation.None,
  // styles override any component

  // encapsulation: ViewEncapsulation.ShadowDom

})
export class Products implements OnInit {
  products: IProduct[] = [];
  name: string = 'ECommerce';
  totalPrice: number = 0;

  categories: ICategory[] = [];

  selectedId: string = '0';

  user = {
    name: 'Sara',
    age: 20,
  };

  completion = 0.89;

  today = new Date();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = [{ id: '0', name: 'All Categories' }, ...data];
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(product: IProduct) {
    this.totalPrice += product.price;
    alert(
      `Product ${product.title} with price ${product.price} was added to the cart.`
    );
  }

  // Pipes Demo
  quantity: number = 1;

  buy(quantity: string, price: number, product: IProduct) {
    alert(
      `Product ${product.title} with price ${price} was added to the cart.\nTotal price: ${+quantity * price}`
    );
  }

  change() {
    this.user.name = 'Ahmed';
    this.user.age = 30;
  }

  trackProduct(index: number, item: IProduct) {
    return item.id;
  }

  filterProducts() {
    if (this.selectedId === '0') {
      this.loadProducts();
    } else {
      this.productService.getProductsByCategory(this.selectedId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Error fetching products by category:', err);
        }
      });
    }
  }
}
