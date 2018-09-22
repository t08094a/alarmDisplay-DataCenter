/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataCenterTestModule } from '../../../test.module';
import { AlarmInfoComponent } from 'app/entities/alarm-info/alarm-info.component';
import { AlarmInfoService } from 'app/entities/alarm-info/alarm-info.service';
import { AlarmInfo } from 'app/shared/model/alarm-info.model';

describe('Component Tests', () => {
    describe('AlarmInfo Management Component', () => {
        let comp: AlarmInfoComponent;
        let fixture: ComponentFixture<AlarmInfoComponent>;
        let service: AlarmInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [AlarmInfoComponent],
                providers: []
            })
                .overrideTemplate(AlarmInfoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AlarmInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlarmInfoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AlarmInfo('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.alarmInfos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
