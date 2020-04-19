import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../../domain";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  readonly DATE_FORMAT = 'dd.MM.yyyy'

  @Input()
  person: Person;

  showContext: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.person);
  }


}
