import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { Principal } from 'app/core';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info',
    templateUrl: './alarm-info.component.html'
})
export class AlarmInfoComponent implements OnInit, OnDestroy {
    alarmInfos: IAlarmInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alarmInfoService: AlarmInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.alarmInfoService.query().subscribe(
            (res: HttpResponse<IAlarmInfo[]>) => {
                this.alarmInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAlarmInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAlarmInfo) {
        return item.id;
    }

    registerChangeInAlarmInfos() {
        this.eventSubscriber = this.eventManager.subscribe('alarmInfoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
