/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DataCenterTestModule } from '../../../test.module';
import { PlaceOfActionDeleteDialogComponent } from 'app/entities/place-of-action/place-of-action-delete-dialog.component';
import { PlaceOfActionService } from 'app/entities/place-of-action/place-of-action.service';

describe('Component Tests', () => {
    describe('PlaceOfAction Management Delete Component', () => {
        let comp: PlaceOfActionDeleteDialogComponent;
        let fixture: ComponentFixture<PlaceOfActionDeleteDialogComponent>;
        let service: PlaceOfActionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [PlaceOfActionDeleteDialogComponent]
            })
                .overrideTemplate(PlaceOfActionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlaceOfActionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceOfActionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
