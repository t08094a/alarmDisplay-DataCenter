import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeywords } from 'app/shared/model/keywords.model';
import { KeywordsService } from './keywords.service';

@Component({
    selector: 'jhi-keywords-delete-dialog',
    templateUrl: './keywords-delete-dialog.component.html'
})
export class KeywordsDeleteDialogComponent {
    keywords: IKeywords;

    constructor(private keywordsService: KeywordsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keywordsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'keywordsListModification',
                content: 'Deleted an keywords'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-keywords-delete-popup',
    template: ''
})
export class KeywordsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ keywords }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KeywordsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.keywords = keywords;
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
