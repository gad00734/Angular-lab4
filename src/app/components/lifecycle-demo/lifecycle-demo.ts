import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  imports: [],
  templateUrl: './lifecycle-demo.html',
  styleUrl: './lifecycle-demo.css',
})
export class LifecycleDemo
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy,
    AfterContentInit,
    AfterContentChecked
{
  constructor() {
    console.log('constructor() called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges() called');
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck() called');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit() called');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked() called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit() called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked() called');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
  }
}
