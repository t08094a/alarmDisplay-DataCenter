import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';
import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from 'app/entities/alarm-info';

@Component({
    selector: 'jhi-resource-update',
    templateUrl: './resource-update.component.html'
})
export class ResourceUpdateComponent implements OnInit {
    private _resource: IResource;
    isSaving: boolean;

    alarminfos: IAlarmInfo[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private resourceService: ResourceService,
        private alarmInfoService: AlarmInfoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ resource }) => {
            this.resource = resource;
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
        if (this.resource.id !== undefined) {
            this.subscribeToSaveResponse(this.resourceService.update(this.resource));
        } else {
            this.subscribeToSaveResponse(this.resourceService.create(this.resource));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>) {
        result.subscribe((res: HttpResponse<IResource>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get resource() {
        return this._resource;
    }

    set resource(resource: IResource) {
        this._resource = resource;
    }
}
