/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { AlarmInfoUpdateComponent } from 'app/entities/alarm-info/alarm-info-update.component';
import { AlarmInfoService } from 'app/entities/alarm-info/alarm-info.service';
import { AlarmInfo } from 'app/shared/model/alarm-info.model';

describe('Component Tests', () => {
    describe('AlarmInfo Management Update Component', () => {
        let comp: AlarmInfoUpdateComponent;
        let fixture: ComponentFixture<AlarmInfoUpdateComponent>;
        let service: AlarmInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [AlarmInfoUpdateComponent]
            })
                .overrideTemplate(AlarmInfoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AlarmInfoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlarmInfoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AlarmInfo('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.alarmInfo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AlarmInfo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.alarmInfo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
