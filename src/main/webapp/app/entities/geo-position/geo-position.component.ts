import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGeoPosition } from 'app/shared/model/geo-position.model';
import { Principal } from 'app/core';
import { GeoPositionService } from './geo-position.service';

@Component({
    selector: 'jhi-geo-position',
    templateUrl: './geo-position.component.html'
})
export class GeoPositionComponent implements OnInit, OnDestroy {
    geoPositions: IGeoPosition[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private geoPositionService: GeoPositionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.geoPositionService.query().subscribe(
            (res: HttpResponse<IGeoPosition[]>) => {
                this.geoPositions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGeoPositions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGeoPosition) {
        return item.id;
    }

    registerChangeInGeoPositions() {
        this.eventSubscriber = this.eventManager.subscribe('geoPositionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
