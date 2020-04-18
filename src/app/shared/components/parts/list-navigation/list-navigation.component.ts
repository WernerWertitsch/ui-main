import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Observable} from "rxjs";
import {PageInfo, PageState} from "../../../service/abstract-rest/pagable-rest-service";
import {NavOptions} from "../../../service/abstract-rest/generic-rest-service";

@Component({
  selector: 'app-list-navigation',
  templateUrl: './list-navigation.component.html',
  styleUrls: ['./list-navigation.component.scss']
})
export class ListNavigationComponent<T> implements OnInit {
  readonly navOptions = NavOptions;

  @Input()
  pageInfo$: Observable<PageInfo>;
  sizePerPage: number;

  @Output()
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  navigationEvent: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();


  constructor() { }

  ngOnInit(): void {
    this.pageInfo$.subscribe(i =>
      this.sizePerPage = i.size);
  }

  pageSize() {
    this.pageSizeChanged.emit(this.sizePerPage);
  }

  navigation($event: NavOptions) {
    this.navigationEvent.emit($event);
  }
}
