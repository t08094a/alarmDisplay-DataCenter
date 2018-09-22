import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommonInfo } from 'app/shared/model/common-info.model';
import { CommonInfoService } from './common-info.service';

@Component({
    selector: 'jhi-common-info-delete-dialog',
    templateUrl: './common-info-delete-dialog.component.html'
})
export class CommonInfoDeleteDialogComponent {
    commonInfo: ICommonInfo;

    constructor(private commonInfoService: CommonInfoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.commonInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commonInfoListModification',
                content: 'Deleted an commonInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-common-info-delete-popup',
    template: ''
})
export class CommonInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commonInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommonInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.commonInfo = commonInfo;
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
