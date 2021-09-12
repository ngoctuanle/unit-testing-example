import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngvn-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {

  status: 'loading' | 'idle' = 'loading';
  page = 1;
  pageSize = 10;
  total = 0;
  peoples: People[] = [];

  private destroyed$ = new Subject();

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadPeople(): void {
    this.status = 'loading';
    this.peopleService.getListPeople({page: this.page, pageSize: this.pageSize})
      .pipe(
        finalize(() => this.status = 'idle'),
        takeUntil(this.destroyed$)
      )
      .subscribe(({total, peoples}) => {
        this.total = total;
        this.peoples = peoples;
      })
  }

  onChangePage(page: number): void {
    this.page = page;
    this.loadPeople();
  }

  onChangePageSize(size: number): void {
    this.pageSize = size;
    this.page = 1;
    this.loadPeople();
  }
}
