import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICommonInfo } from 'app/shared/model/common-info.model';
import { CommonInfoService } from './common-info.service';

@Component({
    selector: 'jhi-common-info-update',
    templateUrl: './common-info-update.component.html'
})
export class CommonInfoUpdateComponent implements OnInit {
    private _commonInfo: ICommonInfo;
    isSaving: boolean;
    showStartDateDp: any;
    showEndDateDp: any;
    alarmRelevantStartDateDp: any;
    alarmRelevantEndDateDp: any;

    constructor(private commonInfoService: CommonInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commonInfo }) => {
            this.commonInfo = commonInfo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.commonInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.commonInfoService.update(this.commonInfo));
        } else {
            this.subscribeToSaveResponse(this.commonInfoService.create(this.commonInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICommonInfo>>) {
        result.subscribe((res: HttpResponse<ICommonInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get commonInfo() {
        return this._commonInfo;
    }

    set commonInfo(commonInfo: ICommonInfo) {
        this._commonInfo = commonInfo;
    }
}
