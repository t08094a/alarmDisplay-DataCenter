import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';
import { PlaceOfActionService } from './place-of-action.service';

@Component({
    selector: 'jhi-place-of-action-delete-dialog',
    templateUrl: './place-of-action-delete-dialog.component.html'
})
export class PlaceOfActionDeleteDialogComponent {
    placeOfAction: IPlaceOfAction;

    constructor(
        private placeOfActionService: PlaceOfActionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.placeOfActionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'placeOfActionListModification',
                content: 'Deleted an placeOfAction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-place-of-action-delete-popup',
    template: ''
})
export class PlaceOfActionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ placeOfAction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlaceOfActionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.placeOfAction = placeOfAction;
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
