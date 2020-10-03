import { Injectable } from '@nestjs/common';
import {ServerVersionInfo} from "@dvfu-delivery/types";
import {AppConfig} from "./app.config";



@Injectable()
export class AppService {
  constructor( ) {
  }
  getVersion(): ServerVersionInfo {
    return { version: AppConfig.release };
  }
}
