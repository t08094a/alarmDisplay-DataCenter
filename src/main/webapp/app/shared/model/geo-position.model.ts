import { IPlaceOfAction } from 'app/shared/model//place-of-action.model';

export interface IGeoPosition {
    id?: number;
    x?: string;
    y?: string;
    placeOfAction?: IPlaceOfAction;
}

export class GeoPosition implements IGeoPosition {
    constructor(public id?: number, public x?: string, public y?: string, public placeOfAction?: IPlaceOfAction) {}
}
