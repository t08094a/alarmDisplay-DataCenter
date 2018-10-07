import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGeoPosition } from 'app/shared/model/geo-position.model';
import { GeoPositionService } from './geo-position.service';
import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';
import { PlaceOfActionService } from 'app/entities/place-of-action';

@Component({
    selector: 'jhi-geo-position-update',
    templateUrl: './geo-position-update.component.html'
})
export class GeoPositionUpdateComponent implements OnInit {
    private _geoPosition: IGeoPosition;
    isSaving: boolean;

    placeofactions: IPlaceOfAction[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private geoPositionService: GeoPositionService,
        private placeOfActionService: PlaceOfActionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ geoPosition }) => {
            this.geoPosition = geoPosition;
        });
        this.placeOfActionService.query().subscribe(
            (res: HttpResponse<IPlaceOfAction[]>) => {
                this.placeofactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.geoPosition.id !== undefined) {
            this.subscribeToSaveResponse(this.geoPositionService.update(this.geoPosition));
        } else {
            this.subscribeToSaveResponse(this.geoPositionService.create(this.geoPosition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGeoPosition>>) {
        result.subscribe((res: HttpResponse<IGeoPosition>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPlaceOfActionById(index: number, item: IPlaceOfAction) {
        return item.id;
    }
    get geoPosition() {
        return this._geoPosition;
    }

    set geoPosition(geoPosition: IGeoPosition) {
        this._geoPosition = geoPosition;
    }
}
