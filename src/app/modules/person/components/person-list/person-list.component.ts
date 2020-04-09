import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject,  Observable} from "rxjs";
import {Person} from "../../domain";
import { map} from "rxjs/operators";
import {combineLatest} from 'rxjs';
import {PageState} from "../../../../shared/service/rest/pagable-rest-service";
import {NavOptions} from "../../../../shared/service/rest/generic-rest-service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, AfterViewInit {

  // @Input()
  // persons$: Observable<Person[]>;

  // DONNERSTAG: Filter anpassen, sodass auf server seite is (mit debounce), und alles mit pageState machen

  @Input()
  pageState$: Observable<PageState<Person>>;

  fullTextFilter: string ='';

  // searchTrigger$ = new BehaviorSubject<any>(undefined);

  @Output()
  filterChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  navigationEvent: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    // setTimeout(t => this.filteredPersons$ = combineLatest(
    //   // fromEvent(this.filterField.nativeElement, "keyup"),
    //   this.searchTrigger$,
    //   this.persons$).pipe(
    //   map(([e, r]) => {
    //     const ret= r.filter(
    //       p => this.eligableForFilter(p)
    //     );
    //     return ret;
    //   })), 0);

  }

  //This should be done directly from the input field, with viewchild or something
  searchTrigger($event: any) {
    this.fullTextFilter = this.fullTextFilter.toLowerCase();
    this.filterChanged.emit(this.fullTextFilter);
    // this.searchTrigger$.next($event);
  }

  navigation($event: NavOptions) {
    this.navigationEvent.emit($event);
  }
}


// personList: Person[];
// filterList: Person[];

// reInitFilter() {
//   this.filterList = this.personList.filter(p => this.eligableForFilter(p));
// }

// eligableForFilter(person: Person) {
//   return !!!this.fullTextFilter  ||
//   person.lastname.toLowerCase().indexOf(this.fullTextFilter) >= 0 ||
//   person.firstname.toLowerCase().indexOf(this.fullTextFilter) >= 0 ||
//   person.id.indexOf(this.fullTextFilter) >= 0 ||
//   (person.phone && person.phone.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0 ) ||
//   (person.email && person.email.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0 );
// }
