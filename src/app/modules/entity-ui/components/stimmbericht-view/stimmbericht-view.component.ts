import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../../../shared/service/entity-service";
import { Stimmbericht} from "../../domain";
import {StimmberichtClientService} from "../../service/stimmbericht-client.service";
@Component({
  selector: 'app-stimmbericht-view',
  templateUrl: './stimmbericht-view.component.html',
  styleUrls: ['./stimmbericht-view.component.scss']
})
export class StimmberichtViewComponent implements OnInit {

  service: EntityService<Stimmbericht>;

  constructor(private stimmberichtClientService: StimmberichtClientService) {
    this.service = stimmberichtClientService;
  }


  ngOnInit(): void {
    this.stimmberichtClientService.load();
  }

  clientService(): StimmberichtClientService {
    return this.stimmberichtClientService;
  }


}
