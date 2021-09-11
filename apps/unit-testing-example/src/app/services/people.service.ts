import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pagination, PaginationPeople, People, UploadResult } from '../models/people';

const TOTAL_PEOPLE = 100;
const PEOPLE: People[] = [...Array(TOTAL_PEOPLE).keys()]
  .map((i) => ({id: i, name: `Name of ${i}`}));
const LIMIT_SIZE = 3; // MB

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  getListPeople({page, pageSize}: Pagination): Observable<PaginationPeople> {
    return of({
      page,
      pageSize,
      total: TOTAL_PEOPLE,
      peoples: PEOPLE.slice((page - 1) * pageSize, page * pageSize)
    })
  }

  getPeopleById(id: number): Observable<People> {
    return of({
      id,
      name: `Name of ${id}`
    })
  }

  uploadIdCardById(id: number, file: File): Observable<UploadResult> {
    if (!(file.size / 1024 / 1024 < LIMIT_SIZE)) {
      return of({result: 'failure'});
    }
    return of({result: 'success'});
  }
}
