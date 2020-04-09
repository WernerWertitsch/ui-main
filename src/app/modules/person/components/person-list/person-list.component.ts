import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject,  Observable} from "rxjs";
import {Person} from "../../domain";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {combineLatest} from 'rxjs';
import {PageState} from "../../../../shared/service/rest/pagable-rest-service";
import {NavOptions} from "../../../../shared/service/rest/generic-rest-service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, AfterViewInit {

  readonly DEBOUNCE_TIME = 200;

  @Input()
  pageState$: Observable<PageState<Person>>;

  @Output()
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  sizePerPage: number;

  @Output()
  navigationEvent: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();

  @Output()
  filterChanged: EventEmitter<string> = new EventEmitter<string>();
  debouncedFilter = new BehaviorSubject<string>('');
  fullTextFilter: string ='';





  constructor() {

  }

  ngOnInit(): void {
    this.pageState$.subscribe(s =>
      this.sizePerPage = s.pageInfo.size);
    this.debouncedFilter.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe(f => {
      this.filterChanged.emit(this.fullTextFilter);
    });
  }

  ngAfterViewInit(): void {
  }


  searchTrigger($event: any) {
    this.fullTextFilter = this.fullTextFilter.toLowerCase();
    this.debouncedFilter.next(this.fullTextFilter);
  }

  navigation($event: NavOptions) {
    this.navigationEvent.emit($event);
  }

  pageSize() {
    this.pageSizeChanged.emit(this.sizePerPage);
  }

}

