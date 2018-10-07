/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { GeoPositionUpdateComponent } from 'app/entities/geo-position/geo-position-update.component';
import { GeoPositionService } from 'app/entities/geo-position/geo-position.service';
import { GeoPosition } from 'app/shared/model/geo-position.model';

describe('Component Tests', () => {
    describe('GeoPosition Management Update Component', () => {
        let comp: GeoPositionUpdateComponent;
        let fixture: ComponentFixture<GeoPositionUpdateComponent>;
        let service: GeoPositionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [GeoPositionUpdateComponent]
            })
                .overrideTemplate(GeoPositionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeoPositionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeoPositionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GeoPosition(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.geoPosition = entity;
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
                    const entity = new GeoPosition();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.geoPosition = entity;
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
