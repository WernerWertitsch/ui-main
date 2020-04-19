import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AbstractEntityListView} from "../abstract-entity-list-view";
import {BaseEntity} from "../../../domain/base-domain";
import {EntityService} from "../../../service/entity-service";
import {PageInfo} from "../../../service/abstract-rest/pagable-rest-service";
import {BehaviorSubject, Observable} from "rxjs";
import {Person} from "../../../../modules/entity-ui/domain";

@Component({
  selector: 'app-entity-list-frame',
  templateUrl: './entity-list-frame.component.html',
  styleUrls: ['./entity-list-frame.component.scss']
})
export class EntityListFrameComponent<T extends BaseEntity> extends AbstractEntityListView<T> implements OnInit {

  @Input()
  $listElement: ElementRef<any>;


  //not soo cool, making an observable of the page info objects which comes from an observable parent object
  //thats because the navigation component takes an observable
  //this will go once we use redux
  pageInfo$: BehaviorSubject<PageInfo> = new BehaviorSubject<PageInfo>(undefined);
  data$: BehaviorSubject<T[]> = new BehaviorSubject(undefined);

  showImporter: boolean;
  showAsTable: boolean = false;

  constructor() {
    super()
  }

  import(data: { filtered: T[], all: T[] }) {
    super.import(data);
    this.showImporter = false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    //not soo cool, making an observable of the page info objects which comes from an observable parent object
    //thats because the navigation component takes an observable
    //this will go once we use redux
    this.pageState$.subscribe(s => {
      this.pageInfo$.next(s.pageInfo);
      this.data$.next(s.data);
    });
  }

}
