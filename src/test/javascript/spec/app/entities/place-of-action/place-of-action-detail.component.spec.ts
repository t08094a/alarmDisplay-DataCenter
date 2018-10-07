/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { PlaceOfActionDetailComponent } from 'app/entities/place-of-action/place-of-action-detail.component';
import { PlaceOfAction } from 'app/shared/model/place-of-action.model';

describe('Component Tests', () => {
    describe('PlaceOfAction Management Detail Component', () => {
        let comp: PlaceOfActionDetailComponent;
        let fixture: ComponentFixture<PlaceOfActionDetailComponent>;
        const route = ({ data: of({ placeOfAction: new PlaceOfAction(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [PlaceOfActionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlaceOfActionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlaceOfActionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.placeOfAction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
