import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerVersionInfo } from '../../../../libs/types/src/lib/types';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getServerInfo(): Observable<ServerVersionInfo> {
    return this.httpClient.get<ServerVersionInfo>(`${environment.serverBaseUrl}/version`);
  }
}
