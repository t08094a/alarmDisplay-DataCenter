import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info-update',
    templateUrl: './alarm-info-update.component.html'
})
export class AlarmInfoUpdateComponent implements OnInit {
    private _alarmInfo: IAlarmInfo;
    isSaving: boolean;
    time: string;

    constructor(private alarmInfoService: AlarmInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ alarmInfo }) => {
            this.alarmInfo = alarmInfo;
        });
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
    get alarmInfo() {
        return this._alarmInfo;
    }

    set alarmInfo(alarmInfo: IAlarmInfo) {
        this._alarmInfo = alarmInfo;
        this.time = moment(alarmInfo.time).format(DATE_TIME_FORMAT);
    }
}
