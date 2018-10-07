import { IAlarmInfo } from 'app/shared/model//alarm-info.model';
import { IEquipment } from 'app/shared/model//equipment.model';

export interface IResource {
    id?: number;
    name?: string;
    alarmInfo?: IAlarmInfo;
    equipments?: IEquipment[];
}

export class Resource implements IResource {
    constructor(public id?: number, public name?: string, public alarmInfo?: IAlarmInfo, public equipments?: IEquipment[]) {}
}
