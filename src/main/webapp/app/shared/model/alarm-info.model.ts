import { Moment } from 'moment';
import { IPlaceOfAction } from 'app/shared/model//place-of-action.model';
import { IKeywords } from 'app/shared/model//keywords.model';
import { IResource } from 'app/shared/model//resource.model';

export interface IAlarmInfo {
    id?: number;
    time?: Moment;
    priority?: number;
    comment?: string;
    placeOfAction?: IPlaceOfAction;
    keywords?: IKeywords;
    resources?: IResource[];
}

export class AlarmInfo implements IAlarmInfo {
    constructor(
        public id?: number,
        public time?: Moment,
        public priority?: number,
        public comment?: string,
        public placeOfAction?: IPlaceOfAction,
        public keywords?: IKeywords,
        public resources?: IResource[]
    ) {}
}
