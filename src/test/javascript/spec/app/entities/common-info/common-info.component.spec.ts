/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoComponent } from 'app/entities/common-info/common-info.component';
import { CommonInfoService } from 'app/entities/common-info/common-info.service';
import { CommonInfo } from 'app/shared/model/common-info.model';

describe('Component Tests', () => {
    describe('CommonInfo Management Component', () => {
        let comp: CommonInfoComponent;
        let fixture: ComponentFixture<CommonInfoComponent>;
        let service: CommonInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoComponent],
                providers: []
            })
                .overrideTemplate(CommonInfoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommonInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommonInfoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CommonInfo('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.commonInfos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
