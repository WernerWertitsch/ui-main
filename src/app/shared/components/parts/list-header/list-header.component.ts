import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {PageState} from "../../../service/abstract-rest/pagable-rest-service";
import {Person} from "../../../../modules/person/domain";
import {NavOptions} from "../../../service/abstract-rest/generic-rest-service";

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeader implements OnInit {
  @Input()
  pageState$: Observable<PageState<Person>>;

  @Output()
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  navigationEvent: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();

  @Output()
  filterChanged: EventEmitter<string> = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {
  }


  searchTriggerd($filter: string) {
    this.filterChanged.emit($filter)
  }

  navigation($event: NavOptions) {
    this.navigationEvent.emit($event);
  }

  pageSizeChange($pageSize: number) {
    this.pageSizeChanged.emit($pageSize);
  }

}
