import { Component } from '@angular/core';
import { ChildDemo } from '../child-demo/child-demo';

@Component({
  selector: 'app-parent-demo',
  imports: [ChildDemo], // Parent of ChildDemo
  templateUrl: './parent-demo.html',
  styleUrl: './parent-demo.css',
})
export class ParentDemo {
  receivedData: string = '';
  products = [
    {
      id: 1,
      name: 'Laptop Dell',
      price: 120000,
    },
    {
      id: 2,
      name: 'IPhone 16',
      price: 100000,
    },
  ];

  receiveDataFromChild(data: string) {
    this.receivedData = data;
    alert(data);
  }
}

/* 
Child => Parent: No Way to send data from child to parent
1. Create Custom Event inside Child => when to fire/trigger ?
EventEmitter + @Output()

2. Insert Data inside Custom Event
Built-in Method .emit

3. Custom Event can't be triggered => Connect Custom Event with Real Event (click - dblclick - submit - reset - keydown - mousedown)
Event Binding

4. Trigger Real Event => Trigger Custom Event

5. Event Propagation => Event during Bubble Phase Received to Parent 

6. Extract Data from Custom Event (Assignment to property in parent)

*/
