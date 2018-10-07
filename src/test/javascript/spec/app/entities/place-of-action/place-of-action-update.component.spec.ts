/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { PlaceOfActionUpdateComponent } from 'app/entities/place-of-action/place-of-action-update.component';
import { PlaceOfActionService } from 'app/entities/place-of-action/place-of-action.service';
import { PlaceOfAction } from 'app/shared/model/place-of-action.model';

describe('Component Tests', () => {
    describe('PlaceOfAction Management Update Component', () => {
        let comp: PlaceOfActionUpdateComponent;
        let fixture: ComponentFixture<PlaceOfActionUpdateComponent>;
        let service: PlaceOfActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [PlaceOfActionUpdateComponent]
            })
                .overrideTemplate(PlaceOfActionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlaceOfActionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceOfActionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PlaceOfAction(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.placeOfAction = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PlaceOfAction();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.placeOfAction = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
