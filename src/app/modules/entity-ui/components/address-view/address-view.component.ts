import {Component, OnInit} from '@angular/core';
import {AddressClientService} from "../../service/address-client.service";
import {EntityService} from "../../../../shared/service/entity-service";
import {Address} from "../../domain";

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  service: EntityService<Address>;

  constructor(private addressClientService: AddressClientService) {
    this.service = addressClientService;
  }

  ngOnInit(): void {
    this.addressClientService.load();
  }



}
