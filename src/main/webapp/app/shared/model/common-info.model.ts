import { Moment } from 'moment';

export interface ICommonInfo {
    id?: number;
    title?: string;
    description?: string;
    showStartDate?: Moment;
    showEndDate?: Moment;
    alarmRelevant?: boolean;
    alarmRelevantStartDate?: Moment;
    alarmRelevantEndDate?: Moment;
}

export class CommonInfo implements ICommonInfo {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public showStartDate?: Moment,
        public showEndDate?: Moment,
        public alarmRelevant?: boolean,
        public alarmRelevantStartDate?: Moment,
        public alarmRelevantEndDate?: Moment
    ) {
        this.alarmRelevant = this.alarmRelevant || false;
    }
}
