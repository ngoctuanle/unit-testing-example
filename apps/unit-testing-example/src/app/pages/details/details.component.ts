import { Component, OnDestroy } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, pluck, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { People } from '../../models/people';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngvn-details',
  templateUrl: './details.component.html',
  providers: [
    NzMessageService
  ]
})
export class DetailsComponent implements OnDestroy {
  private destroyed$ = new Subject();
  status: 'loading' | 'idle' = 'loading';
  people?: People;

  fileToUpload: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private msg: NzMessageService
  ) {
    this.route.params
      .pipe(
        pluck('id'),
        filter(id => !!id),
        switchMap(id => this.peopleService.getPeopleById(Number(id))),
        finalize(() => this.status = 'idle'),
        takeUntil(this.destroyed$)
      )
      .subscribe((res) => {
        this.people = res;
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSelectImage($event: Event): void {
    const element = $event.target as HTMLInputElement;
    this.fileToUpload = element.files && element.files[0];
  }

  onUploadIdCard(): void {
    if (this.people) { 
      this.peopleService.uploadIdCardById(this.people.id, this.fileToUpload as File)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ result }) => {
        if (result === 'failure') {
          this.msg.error('Upload failure');
          return;
        }
        this.msg.success('Upload success');
      })
    }
  }
}
