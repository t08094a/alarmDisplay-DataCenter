import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';
import { Principal } from 'app/core';
import { PlaceOfActionService } from './place-of-action.service';

@Component({
    selector: 'jhi-place-of-action',
    templateUrl: './place-of-action.component.html'
})
export class PlaceOfActionComponent implements OnInit, OnDestroy {
    placeOfActions: IPlaceOfAction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private placeOfActionService: PlaceOfActionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.placeOfActionService.query().subscribe(
            (res: HttpResponse<IPlaceOfAction[]>) => {
                this.placeOfActions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlaceOfActions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlaceOfAction) {
        return item.id;
    }

    registerChangeInPlaceOfActions() {
        this.eventSubscriber = this.eventManager.subscribe('placeOfActionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
