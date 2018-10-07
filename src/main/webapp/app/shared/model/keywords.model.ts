import { IAlarmInfo } from 'app/shared/model//alarm-info.model';

export interface IKeywords {
    id?: number;
    keyword?: string;
    emergencyKeyword?: string;
    b?: string;
    r?: string;
    s?: string;
    t?: string;
    alarmInfo?: IAlarmInfo;
}

export class Keywords implements IKeywords {
    constructor(
        public id?: number,
        public keyword?: string,
        public emergencyKeyword?: string,
        public b?: string,
        public r?: string,
        public s?: string,
        public t?: string,
        public alarmInfo?: IAlarmInfo
    ) {}
}
