import {Component, Input, OnInit} from '@angular/core';
import {BaseEntity} from "../../../domain/base-domain";

@Component({
  selector: 'app-generic-entity-table',
  templateUrl: './generic-entity-table.component.html',
  styleUrls: ['./generic-entity-table.component.scss']
})
export class GenericEntityTableComponent implements OnInit {

  @Input()
  entities: BaseEntity[];
  columns: string[] = [];
  columnWidth: number;

  constructor() { }

  ngOnInit(): void {
    if(this.entities && this.entities.length>0) {
      const sample = this.entities[0];
      for(const key in sample) {
        this.columns.push(key);
      }
      this.columnWidth = 100 / this.entities.length
    }
  }

}
