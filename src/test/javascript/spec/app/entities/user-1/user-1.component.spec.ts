import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentAppTestModule } from '../../../test.module';
import { User1Component } from 'app/entities/user-1/user-1.component';
import { User1Service } from 'app/entities/user-1/user-1.service';
import { User1 } from 'app/shared/model/user-1.model';

describe('Component Tests', () => {
  describe('User1 Management Component', () => {
    let comp: User1Component;
    let fixture: ComponentFixture<User1Component>;
    let service: User1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentAppTestModule],
        declarations: [User1Component],
        providers: []
      })
        .overrideTemplate(User1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(User1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(User1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new User1(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.user1S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
