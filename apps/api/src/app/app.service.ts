import { Injectable } from '@nestjs/common';
import { ServerVersionInfo } from '../../../../libs/types/src/lib/types';
import * as packageInfo from '../../package.json';

@Injectable()
export class AppService {
  getVersion(): ServerVersionInfo {
    return { version: packageInfo.version };
  }
}
