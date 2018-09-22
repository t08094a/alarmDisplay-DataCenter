import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from 'app/shared';
import {
    AlarmInfoComponent,
    AlarmInfoDetailComponent,
    AlarmInfoUpdateComponent,
    AlarmInfoDeletePopupComponent,
    AlarmInfoDeleteDialogComponent,
    alarmInfoRoute,
    alarmInfoPopupRoute
} from './';

const ENTITY_STATES = [...alarmInfoRoute, ...alarmInfoPopupRoute];

@NgModule({
    imports: [DataCenterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlarmInfoComponent,
        AlarmInfoDetailComponent,
        AlarmInfoUpdateComponent,
        AlarmInfoDeleteDialogComponent,
        AlarmInfoDeletePopupComponent
    ],
    entryComponents: [AlarmInfoComponent, AlarmInfoUpdateComponent, AlarmInfoDeleteDialogComponent, AlarmInfoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterAlarmInfoModule {}
