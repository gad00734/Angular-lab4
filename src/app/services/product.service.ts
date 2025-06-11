import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/iproduct';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<{ products: IProduct[] }>(this.apiUrl).pipe(
      map(response => response.products)
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
      map(response => response.map((c: { slug: string; name: string; url: string }) => ({ id: c.slug, name: c.name })))
    );
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<{ products: IProduct[] }>(`${this.apiUrl}/category/${category}`).pipe(
      map(response => response.products)
    );
  }
} 