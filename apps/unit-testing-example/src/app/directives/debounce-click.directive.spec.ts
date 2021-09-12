import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DebounceClickDirective } from './debounce-click.directive';

@Component({
  template: '<button #button ngvnDebounceClick (debounceClick)="click()"></button>',
})
class TestComponent {
  @ViewChild('button', {static: true}) button!: ElementRef<HTMLButtonElement>;
  click = jest.fn();
}

describe('DebounceClickDirective', () => {
  let component: TestComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, DebounceClickDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create an instance', () => {
    const directive = new DebounceClickDirective();
    expect(directive).toBeTruthy();
  });

  it('should not output click event', fakeAsync(() => {
    component.button.nativeElement.click();
    tick(100);
    expect(component.click).not.toHaveBeenCalled();
    tick(500);
  }))

  it('should output click event', fakeAsync(() => {
    component.button.nativeElement.click();
    tick(550);
    expect(component.click).toHaveBeenCalled();
  }))
});
