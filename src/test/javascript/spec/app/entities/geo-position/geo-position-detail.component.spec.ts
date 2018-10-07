/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { GeoPositionDetailComponent } from 'app/entities/geo-position/geo-position-detail.component';
import { GeoPosition } from 'app/shared/model/geo-position.model';

describe('Component Tests', () => {
    describe('GeoPosition Management Detail Component', () => {
        let comp: GeoPositionDetailComponent;
        let fixture: ComponentFixture<GeoPositionDetailComponent>;
        const route = ({ data: of({ geoPosition: new GeoPosition(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [GeoPositionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GeoPositionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeoPositionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.geoPosition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
