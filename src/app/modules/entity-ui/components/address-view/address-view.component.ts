import {Component, OnInit} from '@angular/core';
import {AddressClientService} from "../../service/address-client.service";

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  constructor(private addressClientService: AddressClientService) {
  }

  ngOnInit(): void {
    this.addressClientService.load();
  }

  clientService(): AddressClientService {
    return this.addressClientService;
  }


}
