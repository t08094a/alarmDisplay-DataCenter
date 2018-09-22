/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoDetailComponent } from 'app/entities/common-info/common-info-detail.component';
import { CommonInfo } from 'app/shared/model/common-info.model';

describe('Component Tests', () => {
    describe('CommonInfo Management Detail Component', () => {
        let comp: CommonInfoDetailComponent;
        let fixture: ComponentFixture<CommonInfoDetailComponent>;
        const route = ({ data: of({ commonInfo: new CommonInfo('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CommonInfoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommonInfoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.commonInfo).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
