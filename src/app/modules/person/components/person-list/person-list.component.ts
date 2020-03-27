import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, Observable} from "rxjs";
import {Person} from "../../domain";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, AfterViewInit {

  @Input()
  persons$: Observable<Person[]>;
  filteredPersons$: Observable<Person[]>;
  fullTextFilter: string;

  searchTrigger$ = new BehaviorSubject<any>(undefined);

  constructor() { }

  ngOnInit(): void {
    }

  ngAfterViewInit(): void {
    this.filteredPersons$ = combineLatest(
      this.searchTrigger$,
      this.persons$.pipe(
        map(persons => persons.filter(p => this.eligableForFilter(p)))
      )).pipe(
      map(([e, r]) => r));
  }

  eligableForFilter(person: Person) {
    return
      person.lastname.indexOf(this.fullTextFilter) >= 0 ||
      person.firstname.indexOf(this.fullTextFilter) >= 0 ||
      person.phone.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0 ||
      person.email.filter(phone => phone.indexOf(this.fullTextFilter) >= 0).length > 0;
  }

  //This should be done directly from the input field, with viewchild or something
  searchTrigger($event: any) {
    this.searchTrigger$.next($event);
  }
}
