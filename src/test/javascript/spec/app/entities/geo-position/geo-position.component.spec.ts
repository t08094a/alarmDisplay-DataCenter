/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { GeoPositionComponent } from 'app/entities/geo-position/geo-position.component';
import { GeoPositionService } from 'app/entities/geo-position/geo-position.service';
import { GeoPosition } from 'app/shared/model/geo-position.model';

describe('Component Tests', () => {
    describe('GeoPosition Management Component', () => {
        let comp: GeoPositionComponent;
        let fixture: ComponentFixture<GeoPositionComponent>;
        let service: GeoPositionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [GeoPositionComponent],
                providers: []
            })
                .overrideTemplate(GeoPositionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeoPositionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeoPositionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GeoPosition(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.geoPositions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
