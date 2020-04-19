import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {BaseEntity} from "../../../domain/base-domain";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-pure-entity-list',
  templateUrl: './pure-entity-list.component.html',
  styleUrls: ['./pure-entity-list.component.scss']
})
export class PureEntityListComponent<T extends BaseEntity> implements OnInit {

  @ViewChild('wrapper')
  wrapper: ElementRef<any>;

  @Input()
  $entityComponent: ElementRef<any>;

  @Input()
  colWidth: number = 300;

  @Input()
  entities$: Observable<T[]>;

  cols$: BehaviorSubject<number> = new BehaviorSubject(33);

  ngOnInit(): void {
    this.setCols();
  }

  @HostListener("window:resize", [])
  private onResize() {
    this.setCols();
  }

  setCols() {
    if(!this.wrapper || !this.wrapper.nativeElement) {
      return;
    }
    this.cols$.next(100/(this.wrapper.nativeElement.offsetWidth/this.colWidth));
  }


}
