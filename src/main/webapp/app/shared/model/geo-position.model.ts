import { IPlaceOfAction } from 'app/shared/model//place-of-action.model';

export interface IGeoPosition {
    id?: number;
    x?: number;
    y?: number;
    placeOfAction?: IPlaceOfAction;
}

export class GeoPosition implements IGeoPosition {
    constructor(public id?: number, public x?: number, public y?: number, public placeOfAction?: IPlaceOfAction) {}
}
