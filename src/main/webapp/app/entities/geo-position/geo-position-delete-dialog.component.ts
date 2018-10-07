import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeoPosition } from 'app/shared/model/geo-position.model';
import { GeoPositionService } from './geo-position.service';

@Component({
    selector: 'jhi-geo-position-delete-dialog',
    templateUrl: './geo-position-delete-dialog.component.html'
})
export class GeoPositionDeleteDialogComponent {
    geoPosition: IGeoPosition;

    constructor(
        private geoPositionService: GeoPositionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.geoPositionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'geoPositionListModification',
                content: 'Deleted an geoPosition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-geo-position-delete-popup',
    template: ''
})
export class GeoPositionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ geoPosition }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GeoPositionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.geoPosition = geoPosition;
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
