import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StudentAppTestModule } from '../../../test.module';
import { User1UpdateComponent } from 'app/entities/user-1/user-1-update.component';
import { User1Service } from 'app/entities/user-1/user-1.service';
import { User1 } from 'app/shared/model/user-1.model';

describe('Component Tests', () => {
  describe('User1 Management Update Component', () => {
    let comp: User1UpdateComponent;
    let fixture: ComponentFixture<User1UpdateComponent>;
    let service: User1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentAppTestModule],
        declarations: [User1UpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(User1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(User1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(User1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new User1(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new User1();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
