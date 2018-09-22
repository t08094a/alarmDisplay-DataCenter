import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommonInfo } from 'app/shared/model/common-info.model';

@Component({
    selector: 'jhi-common-info-detail',
    templateUrl: './common-info-detail.component.html'
})
export class CommonInfoDetailComponent implements OnInit {
    commonInfo: ICommonInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commonInfo }) => {
            this.commonInfo = commonInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
