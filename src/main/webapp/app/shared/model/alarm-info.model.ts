import { Moment } from 'moment';

export interface IAlarmInfo {
    id?: string;
    time?: Moment;
    location?: string;
    geoposition?: string;
    keywords?: string;
    comment?: string;
    priority?: number;
}

export class AlarmInfo implements IAlarmInfo {
    constructor(
        public id?: string,
        public time?: Moment,
        public location?: string,
        public geoposition?: string,
        public keywords?: string,
        public comment?: string,
        public priority?: number
    ) {}
}
