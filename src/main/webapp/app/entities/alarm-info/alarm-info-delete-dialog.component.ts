import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';

@Component({
    selector: 'jhi-alarm-info-delete-dialog',
    templateUrl: './alarm-info-delete-dialog.component.html'
})
export class AlarmInfoDeleteDialogComponent {
    alarmInfo: IAlarmInfo;

    constructor(private alarmInfoService: AlarmInfoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.alarmInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alarmInfoListModification',
                content: 'Deleted an alarmInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alarm-info-delete-popup',
    template: ''
})
export class AlarmInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alarmInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AlarmInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.alarmInfo = alarmInfo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
