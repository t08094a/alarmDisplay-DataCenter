import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlarmInfo } from 'app/shared/model/alarm-info.model';

@Component({
    selector: 'jhi-alarm-info-detail',
    templateUrl: './alarm-info-detail.component.html'
})
export class AlarmInfoDetailComponent implements OnInit {
    alarmInfo: IAlarmInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alarmInfo }) => {
            this.alarmInfo = alarmInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
