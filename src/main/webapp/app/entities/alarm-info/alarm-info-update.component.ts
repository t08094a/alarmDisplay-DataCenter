import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';
import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';
import { PlaceOfActionService } from 'app/entities/place-of-action';
import { IKeywords } from 'app/shared/model/keywords.model';
import { KeywordsService } from 'app/entities/keywords';

@Component({
    selector: 'jhi-alarm-info-update',
    templateUrl: './alarm-info-update.component.html'
})
export class AlarmInfoUpdateComponent implements OnInit {
    private _alarmInfo: IAlarmInfo;
    isSaving: boolean;

    placeofactions: IPlaceOfAction[];

    keywords: IKeywords[];
    time: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private alarmInfoService: AlarmInfoService,
        private placeOfActionService: PlaceOfActionService,
        private keywordsService: KeywordsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ alarmInfo }) => {
            this.alarmInfo = alarmInfo;
        });
        this.placeOfActionService.query({ filter: 'alarminfo-is-null' }).subscribe(
            (res: HttpResponse<IPlaceOfAction[]>) => {
                if (!this.alarmInfo.placeOfAction || !this.alarmInfo.placeOfAction.id) {
                    this.placeofactions = res.body;
                } else {
                    this.placeOfActionService.find(this.alarmInfo.placeOfAction.id).subscribe(
                        (subRes: HttpResponse<IPlaceOfAction>) => {
                            this.placeofactions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.keywordsService.query({ filter: 'alarminfo-is-null' }).subscribe(
            (res: HttpResponse<IKeywords[]>) => {
                if (!this.alarmInfo.keywords || !this.alarmInfo.keywords.id) {
                    this.keywords = res.body;
                } else {
                    this.keywordsService.find(this.alarmInfo.keywords.id).subscribe(
                        (subRes: HttpResponse<IKeywords>) => {
                            this.keywords = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.alarmInfo.time = moment(this.time, DATE_TIME_FORMAT);
        if (this.alarmInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.alarmInfoService.update(this.alarmInfo));
        } else {
            this.subscribeToSaveResponse(this.alarmInfoService.create(this.alarmInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAlarmInfo>>) {
        result.subscribe((res: HttpResponse<IAlarmInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackKeywordsById(index: number, item: IKeywords) {
        return item.id;
    }
    get alarmInfo() {
        return this._alarmInfo;
    }

    set alarmInfo(alarmInfo: IAlarmInfo) {
        this._alarmInfo = alarmInfo;
        this.time = moment(alarmInfo.time).format(DATE_TIME_FORMAT);
    }
}
