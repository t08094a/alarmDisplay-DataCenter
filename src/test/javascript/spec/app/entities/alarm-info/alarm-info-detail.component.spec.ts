/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { AlarmInfoDetailComponent } from 'app/entities/alarm-info/alarm-info-detail.component';
import { AlarmInfo } from 'app/shared/model/alarm-info.model';

describe('Component Tests', () => {
    describe('AlarmInfo Management Detail Component', () => {
        let comp: AlarmInfoDetailComponent;
        let fixture: ComponentFixture<AlarmInfoDetailComponent>;
        const route = ({ data: of({ alarmInfo: new AlarmInfo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [AlarmInfoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AlarmInfoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AlarmInfoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.alarmInfo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
