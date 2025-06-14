import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/products">Go to Products Page</a>
    </div>
  `,
  styleUrl: './not-found.css'
})
export class NotFoundComponent {

} 