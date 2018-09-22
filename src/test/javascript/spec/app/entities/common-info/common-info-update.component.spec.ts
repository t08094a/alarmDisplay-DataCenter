/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { CommonInfoUpdateComponent } from 'app/entities/common-info/common-info-update.component';
import { CommonInfoService } from 'app/entities/common-info/common-info.service';
import { CommonInfo } from 'app/shared/model/common-info.model';

describe('Component Tests', () => {
    describe('CommonInfo Management Update Component', () => {
        let comp: CommonInfoUpdateComponent;
        let fixture: ComponentFixture<CommonInfoUpdateComponent>;
        let service: CommonInfoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [CommonInfoUpdateComponent]
            })
                .overrideTemplate(CommonInfoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommonInfoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommonInfoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CommonInfo('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.commonInfo = entity;
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
                    const entity = new CommonInfo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.commonInfo = entity;
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
