import { Component, Input } from '@angular/core';
import { People } from '../../models/people';

@Component({
  selector: 'ngvn-people-info',
  templateUrl: './people-info.component.html',
})
export class PeopleInfoComponent {
  @Input() people!: People;
}
