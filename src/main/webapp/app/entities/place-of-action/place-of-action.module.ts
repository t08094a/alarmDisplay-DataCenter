import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from 'app/shared';
import {
    PlaceOfActionComponent,
    PlaceOfActionDetailComponent,
    PlaceOfActionUpdateComponent,
    PlaceOfActionDeletePopupComponent,
    PlaceOfActionDeleteDialogComponent,
    placeOfActionRoute,
    placeOfActionPopupRoute
} from './';

const ENTITY_STATES = [...placeOfActionRoute, ...placeOfActionPopupRoute];

@NgModule({
    imports: [DataCenterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlaceOfActionComponent,
        PlaceOfActionDetailComponent,
        PlaceOfActionUpdateComponent,
        PlaceOfActionDeleteDialogComponent,
        PlaceOfActionDeletePopupComponent
    ],
    entryComponents: [
        PlaceOfActionComponent,
        PlaceOfActionUpdateComponent,
        PlaceOfActionDeleteDialogComponent,
        PlaceOfActionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterPlaceOfActionModule {}
