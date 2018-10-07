import { IResource } from 'app/shared/model//resource.model';

export interface IEquipment {
    id?: number;
    name?: string;
    resource?: IResource;
}

export class Equipment implements IEquipment {
    constructor(public id?: number, public name?: string, public resource?: IResource) {}
}
