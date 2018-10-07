/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { KeywordsDetailComponent } from 'app/entities/keywords/keywords-detail.component';
import { Keywords } from 'app/shared/model/keywords.model';

describe('Component Tests', () => {
    describe('Keywords Management Detail Component', () => {
        let comp: KeywordsDetailComponent;
        let fixture: ComponentFixture<KeywordsDetailComponent>;
        const route = ({ data: of({ keywords: new Keywords(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [KeywordsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KeywordsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KeywordsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.keywords).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
