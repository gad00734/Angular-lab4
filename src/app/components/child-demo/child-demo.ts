import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-demo',
  imports: [],
  templateUrl: './child-demo.html',
  styleUrl: './child-demo.css',
})
export class ChildDemo {
  @Input() productName: string = '';
  @Input() productPrice: number = 0;

  @Output() cardClicked = new EventEmitter();

  onCardClick() {
    this.cardClicked.emit(this.productName);
  }
}
