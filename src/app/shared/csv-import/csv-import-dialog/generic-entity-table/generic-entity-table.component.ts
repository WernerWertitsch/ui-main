import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseEntity} from "../../../domain/base-domain";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-generic-entity-table',
  templateUrl: './generic-entity-table.component.html',
  styleUrls: ['./generic-entity-table.component.scss']
})
export class GenericEntityTableComponent<T> implements OnInit {

  @Input()
  entities: BaseEntity[];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  dataSource: MatTableDataSource<T>;


  columns: string[] = [];
  columnWidth: number;

  excludeFilter: string="";
  includeFilter: string="";
  combinedFilter: string="";

  constructor() { }

  ngOnInit(): void {
    if(this.entities && this.entities.length>0) {
      const sample = this.entities[0];
      for(const key in sample) {
        this.columns.push(key);
      }
      this.columnWidth = 100 / this.entities.length
      this.dataSource =  new MatTableDataSource<any>(this.entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (d: any, filter: string) => {
        const filters = filter.split("######");
          for(let i=0; i<this.columns.length; i++) {
            const fieldValue = d[this.columns[i]];
            if(Array.isArray(fieldValue)) {
              return fieldValue.filter(dd => this.applyFilter(dd[i], filters[0], filters[1])).length > 0;
            } else {
              return this.applyFilter(fieldValue, filters[0], filters[1]);
            }
          }
          return false;
        }
    }
  }

  private applyFilter(data: any, excludeFilter: string, includeFilter: string): boolean {
    return (!includeFilter && !excludeFilter) || ((includeFilter && data.toString().toLowerCase().indexOf(includeFilter.toLowerCase())>=0))
    || ((!!excludeFilter && data.toString().toLowerCase().indexOf(excludeFilter.toLowerCase())<0));
  }

  filter() {
    this.dataSource.filter = this.excludeFilter + "######" + this.includeFilter;
    // this.combinedFilter = this.includeFilter + "######" + this.excludeFilter;
  }

}
