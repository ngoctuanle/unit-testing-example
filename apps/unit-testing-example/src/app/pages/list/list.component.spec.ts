import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
