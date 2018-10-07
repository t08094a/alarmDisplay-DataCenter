import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from 'app/shared';
import {
    GeoPositionComponent,
    GeoPositionDetailComponent,
    GeoPositionUpdateComponent,
    GeoPositionDeletePopupComponent,
    GeoPositionDeleteDialogComponent,
    geoPositionRoute,
    geoPositionPopupRoute
} from './';

const ENTITY_STATES = [...geoPositionRoute, ...geoPositionPopupRoute];

@NgModule({
    imports: [DataCenterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GeoPositionComponent,
        GeoPositionDetailComponent,
        GeoPositionUpdateComponent,
        GeoPositionDeleteDialogComponent,
        GeoPositionDeletePopupComponent
    ],
    entryComponents: [GeoPositionComponent, GeoPositionUpdateComponent, GeoPositionDeleteDialogComponent, GeoPositionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterGeoPositionModule {}
