import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject,  Observable} from "rxjs";
import {Person} from "../../domain";
import { map} from "rxjs/operators";
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, AfterViewInit {

  @Input()
  persons$: Observable<Person[]>;

  filteredPersons$: Observable<Person[]>;
  fullTextFilter: string ='';

  searchTrigger$ = new BehaviorSubject<any>(undefined);

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(t => this.filteredPersons$ = combineLatest(
      // fromEvent(this.filterField.nativeElement, "keyup"),
      this.searchTrigger$,
      this.persons$).pipe(
      map(([e, r]) => {
        const ret= r.filter(
          p => this.eligableForFilter(p)
        );
        return ret;
      })), 0);
  }

  eligableForFilter(person: Person) {
    return !!!this.fullTextFilter  ||
    person.lastname.toLowerCase().indexOf(this.fullTextFilter) >= 0 ||
    person.firstname.toLowerCase().indexOf(this.fullTextFilter) >= 0 ||
    person.id.indexOf(this.fullTextFilter) >= 0 ||
    (person.phone && person.phone.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0 ) ||
    (person.email && person.email.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0 );
  }

  //This should be done directly from the input field, with viewchild or something
  searchTrigger($event: any) {
    this.fullTextFilter = this.fullTextFilter.toLowerCase();
    this.searchTrigger$.next($event);
  }
}
