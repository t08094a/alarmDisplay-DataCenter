import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEquipment } from 'app/shared/model/equipment.model';
import { Principal } from 'app/core';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'jhi-equipment',
    templateUrl: './equipment.component.html'
})
export class EquipmentComponent implements OnInit, OnDestroy {
    equipment: IEquipment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private equipmentService: EquipmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.equipmentService.query().subscribe(
            (res: HttpResponse<IEquipment[]>) => {
                this.equipment = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEquipment();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEquipment) {
        return item.id;
    }

    registerChangeInEquipment() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
