import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  @Output()
  filteredEntities: EventEmitter<T[]> = new EventEmitter<T[]>();
  emptyFilter: { [id: string]: boolean } = {};
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  dataSource: MatTableDataSource<T>;


  columns: string[] = [];
  columnWidth: number;

  excludeFilter: string = "";
  includeFilter: string = "";

  constructor() {
  }

  ngOnInit(): void {
    if (this.entities && this.entities.length > 0) {
      const sample = this.entities[0];
      for (const key in sample) {
        this.columns.push(key);
        this.emptyFilter[key] = false;
      }
      this.columnWidth = 100 / this.entities.length
      this.dataSource = new MatTableDataSource<any>(this.entities);
      this.dataSource.paginator = this.paginator;
      // GEES MAKE THIS ELEGANT!
      this.dataSource.filterPredicate = (d: any, filter: string) => {
        let ret = false;
        for (let i = 0; i < this.columns.length; i++) {
          if (this.emptyFilter[this.columns[i]] && (!d[this.columns[i]] || d[this.columns[i]].toString().trim() == "")) {
            return false;
          }
        }
        const ftFilters = filter.split("######");
        if(!ftFilters[0] && !ftFilters[1]) {
          return true;
        }
        for (let i = 0; i < this.columns.length; i++) {
          const fieldValue = d[this.columns[i]];
          if (Array.isArray(fieldValue)) {
            if (fieldValue.filter(dd => this.applyFilter(dd, ftFilters[1])).length > 0) {
              return true;
            }
          } else {
            if (this.applyFilter(fieldValue, ftFilters[1])) {
              return true;
            }
          }
        }
        if(ftFilters[0]) {
          for (let i = 0; i < this.columns.length; i++) {
            const fieldValue = d[this.columns[i]];
            if (Array.isArray(fieldValue)) {
              if (fieldValue.filter(dd => this.applyFilter(dd, ftFilters[0])).length > 0) {
                return false;
              }
            } else {
              if (this.applyFilter(fieldValue, ftFilters[0])) {
                return false;
              }
            }
          }
        } else {
          return false;
        }
        return true;
      }
    }
  }

  private applyFilter(data: any, includeFilter: string): boolean {
    if (!data) {
      data = "";
    }
    return ((!!includeFilter && data.toString().toLowerCase().indexOf(includeFilter.toLowerCase()) >= 0));
  }

  filterChanged() {
    this.dataSource.filter = this.excludeFilter + "######" + this.includeFilter;
    this.filteredEntities.emit(this.dataSource.filteredData.length == this.dataSource.data.length ? undefined: this.dataSource.filteredData);
    // this.combinedFilter = this.includeFilter + "######" + this.excludeFilter;
  }

}
