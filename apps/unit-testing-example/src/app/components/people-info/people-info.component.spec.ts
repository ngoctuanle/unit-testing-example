import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInfoComponent } from './people-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PeopleInfoComponent', () => {
  let component: PeopleInfoComponent;
  let fixture: ComponentFixture<PeopleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleInfoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInfoComponent);
    component = fixture.componentInstance;
    component.people = {id: 1, name: 'Name of 1'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
