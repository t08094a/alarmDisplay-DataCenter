/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DataCenterTestModule } from '../../../test.module';
import { AlarmInfoDeleteDialogComponent } from 'app/entities/alarm-info/alarm-info-delete-dialog.component';
import { AlarmInfoService } from 'app/entities/alarm-info/alarm-info.service';

describe('Component Tests', () => {
    describe('AlarmInfo Management Delete Component', () => {
        let comp: AlarmInfoDeleteDialogComponent;
        let fixture: ComponentFixture<AlarmInfoDeleteDialogComponent>;
        let service: AlarmInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [AlarmInfoDeleteDialogComponent]
            })
                .overrideTemplate(AlarmInfoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AlarmInfoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlarmInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
