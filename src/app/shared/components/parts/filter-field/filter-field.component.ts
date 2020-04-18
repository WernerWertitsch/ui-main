import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PageState} from "../../../service/abstract-rest/pagable-rest-service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent implements OnInit {
  readonly DEBOUNCE_TIME = 200;

  @Output()
  filterChanged: EventEmitter<string> = new EventEmitter<string>();

  // ich glaube es gibt einen weg direkt ein observable from "keyUp" event erzeugen, googlen und diese felder sparen wenn geht
  debouncedFilter = new BehaviorSubject<string>('');
  fullTextFilter: string ='';

  ngOnInit(): void {
    this.debouncedFilter.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe(f => {
      this.filterChanged.emit(this.fullTextFilter);
    });
  }

  searchTrigger($event: any) {
    this.fullTextFilter = this.fullTextFilter.toLowerCase();
    this.debouncedFilter.next(this.fullTextFilter);
  }

}
