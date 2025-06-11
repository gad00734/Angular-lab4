import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDemo } from './child-demo';

describe('ChildDemo', () => {
  let component: ChildDemo;
  let fixture: ComponentFixture<ChildDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
