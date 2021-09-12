import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { PeopleService } from '../../services/people.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const PAGE = 1;
const PAGE_SIZE = 10;
const SAMPLE_TOTAL = 100;
const SAMPLE_PAGINATION = {
    page: 1,
    pageSize: 10,
    total: SAMPLE_TOTAL,
    peoples: [...Array(SAMPLE_TOTAL).keys()]
        .map((i) => ({id: i, name: `Name of ${i}`}))
        .slice((PAGE - 1) * PAGE_SIZE, PAGE * PAGE_SIZE)
}

describe('ListComponent', () => {
  let component: ListComponent;

  const peopleServiceSpy = {
    getListPeople: jest.fn().mockReturnValue(of(SAMPLE_PAGINATION))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        NzTableModule,
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: PeopleService,
          useValue: peopleServiceSpy
        }
      ]
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

  describe('ngOnInit', () => {
    it('should call getListPeople', () => {
      expect(peopleServiceSpy.getListPeople)
        .toHaveBeenCalledWith({page: component.page, pageSize: component.pageSize});
    });
    it('should total equal 100', () => {
      expect(component.total).toEqual(SAMPLE_TOTAL);
    });
    it('should list of person have value', () => {
      expect(component.peoples).toEqual(SAMPLE_PAGINATION.peoples);    
    });
    it('should state equal idle', () => {
      expect(component.status).toEqual('idle');    
    });
  })

  it('should load list of person with page = 1', () => {
    component.onChangePage(1);
    expect(component.page).toEqual(1);
  });

  it('should load list of person with pageSize = 10', () => {
    component.onChangePageSize(10)
    expect(component.pageSize).toEqual(10);
  });
});
