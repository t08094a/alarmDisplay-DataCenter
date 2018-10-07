import { IGeoPosition } from 'app/shared/model//geo-position.model';
import { IAlarmInfo } from 'app/shared/model//alarm-info.model';

export interface IPlaceOfAction {
    id?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    addition?: string;
    geoPosition?: IGeoPosition;
    alarmInfo?: IAlarmInfo;
}

export class PlaceOfAction implements IPlaceOfAction {
    constructor(
        public id?: number,
        public street?: string,
        public houseNumber?: string,
        public city?: string,
        public addition?: string,
        public geoPosition?: IGeoPosition,
        public alarmInfo?: IAlarmInfo
    ) {}
}
