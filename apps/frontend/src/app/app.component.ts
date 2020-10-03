import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerVersionInfo } from '@dvfu-delivery/types';
import { UserService } from './core/api/user.service';
import { ServerInfoService } from './server-info.service';

@Component({
  selector: 'dvfu-delivery-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private serverInfoService: ServerInfoService,
    private userService: UserService,
  ) {}

  title = 'frontend';

  version$: Observable<ServerVersionInfo>;
  ngOnInit(): void {
    this.version$ = this.serverInfoService.getServerInfo();
    this.userService.getMe().subscribe( currentUser => console.log('currentUser', currentUser));
  }
}
