/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { PlaceOfActionComponent } from 'app/entities/place-of-action/place-of-action.component';
import { PlaceOfActionService } from 'app/entities/place-of-action/place-of-action.service';
import { PlaceOfAction } from 'app/shared/model/place-of-action.model';

describe('Component Tests', () => {
    describe('PlaceOfAction Management Component', () => {
        let comp: PlaceOfActionComponent;
        let fixture: ComponentFixture<PlaceOfActionComponent>;
        let service: PlaceOfActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [PlaceOfActionComponent],
                providers: []
            })
                .overrideTemplate(PlaceOfActionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlaceOfActionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceOfActionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PlaceOfAction(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.placeOfActions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
