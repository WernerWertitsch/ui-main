import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Observable} from "rxjs";
import {PageState} from "../../../service/abstract-rest/pagable-rest-service";
import {NavOptions} from "../../../service/abstract-rest/generic-rest-service";

@Component({
  selector: 'app-list-navigation',
  templateUrl: './list-navigation.component.html',
  styleUrls: ['./list-navigation.component.scss']
})
export class ListNavigationComponent<T> implements OnInit {
  readonly navOptions = NavOptions;

  @Input()
  pageState$: Observable<PageState<T>>;
  sizePerPage: number;

  @Output()
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  navigationEvent: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();


  constructor() { }

  ngOnInit(): void {
    this.pageState$.subscribe(s =>
      this.sizePerPage = s.pageInfo.size);

  }

  pageSize() {
    this.pageSizeChanged.emit(this.sizePerPage);
  }

  navigation($event: NavOptions) {
    this.navigationEvent.emit($event);
  }
}
