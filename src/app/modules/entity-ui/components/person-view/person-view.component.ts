import {Component, OnInit} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {EntityService} from "../../../../shared/service/entity-service";
import {Person} from "../../domain";
@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  service: EntityService<Person>;

  constructor(private personClientService: PersonClientService) {
    this.service = personClientService;
  }


  ngOnInit(): void {
    this.personClientService.load();
  }

  clientService(): PersonClientService {
    return this.personClientService;
  }


}
