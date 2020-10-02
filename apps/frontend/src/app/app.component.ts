import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerVersionInfo } from '../../../../libs/types/src/lib/types';
import { ServerInfoService } from './server-info.service';

@Component({
  selector: 'dvfu-delivery-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private serverInfoService: ServerInfoService) {
  }

  title = 'frontend';

  version$: Observable<ServerVersionInfo>;
  ngOnInit(): void {
    this.version$ = this.serverInfoService.getServerInfo();
  }
}
