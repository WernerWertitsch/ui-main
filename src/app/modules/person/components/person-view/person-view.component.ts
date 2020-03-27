import { Component, OnInit } from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {Observable} from "rxjs";
import {Person} from "../../domain";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  constructor(private clientService: PersonClientService) { }

  personList: Observable<Person[]>;

  ngOnInit(): void {
    this.personList = this.clientService.watchAllPersons();
  }

}
