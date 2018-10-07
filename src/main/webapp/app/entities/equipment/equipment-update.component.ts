import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from './equipment.service';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource';

@Component({
    selector: 'jhi-equipment-update',
    templateUrl: './equipment-update.component.html'
})
export class EquipmentUpdateComponent implements OnInit {
    private _equipment: IEquipment;
    isSaving: boolean;

    resources: IResource[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private equipmentService: EquipmentService,
        private resourceService: ResourceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ equipment }) => {
            this.equipment = equipment;
        });
        this.resourceService.query().subscribe(
            (res: HttpResponse<IResource[]>) => {
                this.resources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.equipment.id !== undefined) {
            this.subscribeToSaveResponse(this.equipmentService.update(this.equipment));
        } else {
            this.subscribeToSaveResponse(this.equipmentService.create(this.equipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEquipment>>) {
        result.subscribe((res: HttpResponse<IEquipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackResourceById(index: number, item: IResource) {
        return item.id;
    }
    get equipment() {
        return this._equipment;
    }

    set equipment(equipment: IEquipment) {
        this._equipment = equipment;
    }
}
