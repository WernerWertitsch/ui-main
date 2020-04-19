import {Component, Input, OnInit} from '@angular/core';
import {BaseEntity} from "../../../domain/base-domain";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-pure-entity-table',
  templateUrl: './pure-entity-table.component.html',
  styleUrls: ['./pure-entity-table.component.scss']
})
export class PureEntityTableComponent<T extends BaseEntity> implements OnInit {

  readonly defaultIngoreFields=["_links", "self"];

  @Input()
  explicitColumns: string[];

  @Input()
  ignoreFields: string[] = [];

  @Input()
  entities$: Observable<T[]>;

  effectiveColumns: string[];
  dataSource: MatTableDataSource<T>;

  constructor() { }

  ngOnInit(): void {
    if(this.explicitColumns) {
      this.effectiveColumns = this.explicitColumns;
    } else {
      this.entities$.subscribe(es => this.defineColumns(es));
    }
    this.entities$.subscribe(es => this.dataSource = new MatTableDataSource(es));
  }

  defineColumns(entities: T[]) {
    if(entities && entities.length>0) {
      this.effectiveColumns = Object.keys(entities[0]).filter(k => (this.defaultIngoreFields.concat(this.ignoreFields)).filter(i => k.indexOf(i)>=0).length==0);
    }
  }



}
