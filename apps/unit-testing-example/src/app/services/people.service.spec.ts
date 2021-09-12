import { PeopleService } from './people.service';
import { TestBed } from '@angular/core/testing';

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
const SAMPLE_PEOPLE = {
    id: 1,
    name: `Name of 1`
}

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    // service = new PeopleService();
    TestBed.configureTestingModule({
        providers: [PeopleService]
    });
    service = TestBed.inject(PeopleService);
  });


  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return people list', () => {
    const result = service.getListPeople({page: 1, pageSize: 10});
    result.subscribe((res) => {
        expect(res).toEqual(SAMPLE_PAGINATION);
    })
  });

  it('should return people details', () => {
      const details = service.getPeopleById(1);
      details.subscribe((res) => {
          expect(res).toEqual(SAMPLE_PEOPLE);
      });
  });

  it('should return uploade result with valid file', () => {
      const result = service.uploadIdCardById(1, {size: 1000} as File);
      result.subscribe(res => {
          expect(res.result).toEqual('success');
      });
  });

  it('should return uploade result with invalid file', () => {
    const result = service.uploadIdCardById(1, {size: 4_000_000} as File);
    result.subscribe(res => {
        expect(res.result).toEqual('failure');
    });
})
});
