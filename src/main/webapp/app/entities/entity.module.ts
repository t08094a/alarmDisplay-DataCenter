import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DataCenterAlarmInfoModule } from './alarm-info/alarm-info.module';
import { DataCenterCommonInfoModule } from './common-info/common-info.module';
import { DataCenterPlaceOfActionModule } from './place-of-action/place-of-action.module';
import { DataCenterGeoPositionModule } from './geo-position/geo-position.module';
import { DataCenterKeywordsModule } from './keywords/keywords.module';
import { DataCenterResourceModule } from './resource/resource.module';
import { DataCenterEquipmentModule } from './equipment/equipment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DataCenterAlarmInfoModule,
        DataCenterCommonInfoModule,
        DataCenterPlaceOfActionModule,
        DataCenterGeoPositionModule,
        DataCenterKeywordsModule,
        DataCenterResourceModule,
        DataCenterEquipmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCenterEntityModule {}
