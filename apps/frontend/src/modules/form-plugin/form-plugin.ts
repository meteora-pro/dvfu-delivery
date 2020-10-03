import { Injectable } from '@angular/core';
import { getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store';
import { UpdateFormStatuses, UpdateFormValue } from './form-plugin.actions';

import { Observable } from 'rxjs';

@Injectable()
export class FormPlugin implements NgxsPlugin {
  public handle(
    state: {},
    action: UpdateFormValue<unknown> & UpdateFormStatuses,
    next: NgxsNextPluginFn
  ): Observable<unknown> {
    const type = getActionTypeFromInstance(action);

    let nextState = state;

    if (type === UpdateFormValue.type) {
      nextState = setValue(nextState, action.payload.path, action.payload.value);
    }

    return next(nextState, action);
  }

}
