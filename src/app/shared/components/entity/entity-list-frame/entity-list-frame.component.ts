import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AbstractEntityListView} from "../abstract-entity-list-view";
import {BaseEntity} from "../../../domain/base-domain";
import {EntityService} from "../../../service/entity-service";

@Component({
  selector: 'app-entity-list-frame',
  templateUrl: './entity-list-frame.component.html',
  styleUrls: ['./entity-list-frame.component.scss']
})
export class EntityListFrameComponent<T extends BaseEntity> extends AbstractEntityListView<T> implements OnInit {

  @Input()
  $listElement: ElementRef<any>;

  showImporter: boolean;
  showAsTable: boolean = false;

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
