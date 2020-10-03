import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {LayoutState} from './layout/layout.state';

export const STATE_KEY = 'common';

@State({
    name: STATE_KEY,
    defaults: {},
    children: [LayoutState],
})
@Injectable()
export class CommonState {}
