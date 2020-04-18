import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {BaseEntity} from "../../../domain/base-domain";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pure-entity-list',
  templateUrl: './pure-entity-list.component.html',
  styleUrls: ['./pure-entity-list.component.scss']
})
export class PureEntityListComponent<T extends BaseEntity> implements OnInit {

  @Input()
  $entityComponent: ElementRef<any>;

  @Input()
  entities$: Observable<T[]>;

  ngOnInit(): void {

  }

}
