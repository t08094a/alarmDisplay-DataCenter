import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from 'app/shared';
import {
    CommonInfoComponent,
    CommonInfoDetailComponent,
    CommonInfoUpdateComponent,
    CommonInfoDeletePopupComponent,
    CommonInfoDeleteDialogComponent,
    commonInfoRoute,
    commonInfoPopupRoute
} from './';

const ENTITY_STATES = [...commonInfoRoute, ...commonInfoPopupRoute];

@NgModule({
    imports: [DataCenterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommonInfoComponent,
        CommonInfoDetailComponent,
        CommonInfoUpdateComponent,
        CommonInfoDeleteDialogComponent,
        CommonInfoDeletePopupComponent
    ],
    entryComponents: [CommonInfoComponent, CommonInfoUpdateComponent, CommonInfoDeleteDialogComponent, CommonInfoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterCommonInfoModule {}
