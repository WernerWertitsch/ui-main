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

  personList: Observable<Person[]>;

  constructor(private clientService: PersonClientService) {
    this.personList = this.clientService.watchAllPersons();
  }


  ngOnInit(): void {

  }

}
