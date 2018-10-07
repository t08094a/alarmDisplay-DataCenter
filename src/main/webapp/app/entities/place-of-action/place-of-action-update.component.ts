import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';
import { PlaceOfActionService } from './place-of-action.service';
import { IGeoPosition } from 'app/shared/model/geo-position.model';
import { GeoPositionService } from 'app/entities/geo-position';
import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from 'app/entities/alarm-info';

@Component({
    selector: 'jhi-place-of-action-update',
    templateUrl: './place-of-action-update.component.html'
})
export class PlaceOfActionUpdateComponent implements OnInit {
    private _placeOfAction: IPlaceOfAction;
    isSaving: boolean;

    geopositions: IGeoPosition[];

    alarminfos: IAlarmInfo[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private placeOfActionService: PlaceOfActionService,
        private geoPositionService: GeoPositionService,
        private alarmInfoService: AlarmInfoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ placeOfAction }) => {
            this.placeOfAction = placeOfAction;
        });
        this.geoPositionService.query({ filter: 'placeofaction-is-null' }).subscribe(
            (res: HttpResponse<IGeoPosition[]>) => {
                if (!this.placeOfAction.geoPosition || !this.placeOfAction.geoPosition.id) {
                    this.geopositions = res.body;
                } else {
                    this.geoPositionService.find(this.placeOfAction.geoPosition.id).subscribe(
                        (subRes: HttpResponse<IGeoPosition>) => {
                            this.geopositions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.alarmInfoService.query().subscribe(
            (res: HttpResponse<IAlarmInfo[]>) => {
                this.alarminfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.placeOfAction.id !== undefined) {
            this.subscribeToSaveResponse(this.placeOfActionService.update(this.placeOfAction));
        } else {
            this.subscribeToSaveResponse(this.placeOfActionService.create(this.placeOfAction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceOfAction>>) {
        result.subscribe((res: HttpResponse<IPlaceOfAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGeoPositionById(index: number, item: IGeoPosition) {
        return item.id;
    }

    trackAlarmInfoById(index: number, item: IAlarmInfo) {
        return item.id;
    }
    get placeOfAction() {
        return this._placeOfAction;
    }

    set placeOfAction(placeOfAction: IPlaceOfAction) {
        this._placeOfAction = placeOfAction;
    }
}
