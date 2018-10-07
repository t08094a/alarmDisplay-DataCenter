/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataCenterTestModule } from '../../../test.module';
import { KeywordsUpdateComponent } from 'app/entities/keywords/keywords-update.component';
import { KeywordsService } from 'app/entities/keywords/keywords.service';
import { Keywords } from 'app/shared/model/keywords.model';

describe('Component Tests', () => {
    describe('Keywords Management Update Component', () => {
        let comp: KeywordsUpdateComponent;
        let fixture: ComponentFixture<KeywordsUpdateComponent>;
        let service: KeywordsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DataCenterTestModule],
                declarations: [KeywordsUpdateComponent]
            })
                .overrideTemplate(KeywordsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KeywordsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Keywords(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.keywords = entity;
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
                    const entity = new Keywords();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.keywords = entity;
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
