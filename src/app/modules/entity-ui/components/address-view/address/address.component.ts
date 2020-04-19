import {Component, Input, OnInit} from '@angular/core';
import {Address, Person} from "../../../domain";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  readonly DATE_FORMAT = 'dd.MM.yyyy'

  @Input()
  address: Address;

  showContext: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.person);
  }


}
