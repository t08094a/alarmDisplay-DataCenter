import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataCenterSharedModule } from 'app/shared';
import {
    KeywordsComponent,
    KeywordsDetailComponent,
    KeywordsUpdateComponent,
    KeywordsDeletePopupComponent,
    KeywordsDeleteDialogComponent,
    keywordsRoute,
    keywordsPopupRoute
} from './';

const ENTITY_STATES = [...keywordsRoute, ...keywordsPopupRoute];

@NgModule({
    imports: [DataCenterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        KeywordsComponent,
        KeywordsDetailComponent,
        KeywordsUpdateComponent,
        KeywordsDeleteDialogComponent,
        KeywordsDeletePopupComponent
    ],
    entryComponents: [KeywordsComponent, KeywordsUpdateComponent, KeywordsDeleteDialogComponent, KeywordsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterKeywordsModule {}
