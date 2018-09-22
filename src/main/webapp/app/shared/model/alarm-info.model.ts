import { Moment } from 'moment';

export interface IAlarmInfo {
    id?: number;
    time?: Moment;
    location?: string;
    geoposition?: string;
    keywords?: string;
    comment?: string;
    priority?: number;
}

export class AlarmInfo implements IAlarmInfo {
    constructor(
        public id?: number,
        public time?: Moment,
        public location?: string,
        public geoposition?: string,
        public keywords?: string,
        public comment?: string,
        public priority?: number
    ) {}
}
