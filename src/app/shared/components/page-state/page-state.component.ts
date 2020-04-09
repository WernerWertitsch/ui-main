import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageState} from "../../service/rest/pagable-rest-service";
import {Observable} from "rxjs";
import {BaseEntity} from "../../domain/base-domain";
import {NavOptions} from "../../service/rest/generic-rest-service";

@Component({
  selector: 'app-page-state',
  templateUrl: './page-state.component.html',
  styleUrls: ['./page-state.component.scss']
})
export class PageStateComponent<T extends BaseEntity> implements OnInit {

  readonly navOptions = NavOptions;

  constructor() { }

  @Input()
  pageState$: Observable<PageState<T>>;

  @Output()
  navigation: EventEmitter<NavOptions> = new EventEmitter<NavOptions>();



  ngOnInit(): void {

  }

  navigate(navOption: NavOptions) {
    this.navigation.emit(navOption);
  }



}
