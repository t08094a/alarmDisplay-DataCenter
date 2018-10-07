/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { KeywordsComponent } from 'app/entities/keywords/keywords.component';
import { KeywordsService } from 'app/entities/keywords/keywords.service';
import { Keywords } from 'app/shared/model/keywords.model';

describe('Component Tests', () => {
    describe('Keywords Management Component', () => {
        let comp: KeywordsComponent;
        let fixture: ComponentFixture<KeywordsComponent>;
        let service: KeywordsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [KeywordsComponent],
                providers: []
            })
                .overrideTemplate(KeywordsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KeywordsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Keywords(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.keywords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
