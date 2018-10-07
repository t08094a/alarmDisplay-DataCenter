import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKeywords } from 'app/shared/model/keywords.model';
import { Principal } from 'app/core';
import { KeywordsService } from './keywords.service';

@Component({
    selector: 'jhi-keywords',
    templateUrl: './keywords.component.html'
})
export class KeywordsComponent implements OnInit, OnDestroy {
    keywords: IKeywords[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keywordsService: KeywordsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.keywordsService.query().subscribe(
            (res: HttpResponse<IKeywords[]>) => {
                this.keywords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKeywords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKeywords) {
        return item.id;
    }

    registerChangeInKeywords() {
        this.eventSubscriber = this.eventManager.subscribe('keywordsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
