import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IKeywords } from 'app/shared/model/keywords.model';
import { KeywordsService } from './keywords.service';
import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from 'app/entities/alarm-info';

@Component({
    selector: 'jhi-keywords-update',
    templateUrl: './keywords-update.component.html'
})
export class KeywordsUpdateComponent implements OnInit {
    private _keywords: IKeywords;
    isSaving: boolean;

    alarminfos: IAlarmInfo[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private keywordsService: KeywordsService,
        private alarmInfoService: AlarmInfoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ keywords }) => {
            this.keywords = keywords;
        });
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
        if (this.keywords.id !== undefined) {
            this.subscribeToSaveResponse(this.keywordsService.update(this.keywords));
        } else {
            this.subscribeToSaveResponse(this.keywordsService.create(this.keywords));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IKeywords>>) {
        result.subscribe((res: HttpResponse<IKeywords>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAlarmInfoById(index: number, item: IAlarmInfo) {
        return item.id;
    }
    get keywords() {
        return this._keywords;
    }

    set keywords(keywords: IKeywords) {
        this._keywords = keywords;
    }
}
