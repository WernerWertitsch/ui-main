import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonClientService} from "../../service/person-client.service";
import {EntityService} from "../../../../shared/service/entity-service";
import {Person} from "../../domain";
@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit, AfterViewInit {

  @ViewChild("viewAddressComponent")
  viewAddressComponent: ElementRef<any>;

  @ViewChild("editAddressComponent")
  editAddressComponent: ElementRef<any>;

  $subComponents: {[id: string]: {view: ElementRef<any>, edit: ElementRef<any>}} = {};
  service: EntityService<Person>;

  constructor(private personClientService: PersonClientService) {
    this.service = personClientService;
  }


  ngOnInit(): void {
    this.personClientService.load();

  }
  ngAfterViewInit(): void {
    this.$subComponents['addresses'] = {view: this.viewAddressComponent, edit: this.editAddressComponent};
  }


  clientService(): PersonClientService {
    return this.personClientService;
  }



}
