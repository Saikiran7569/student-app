import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentAppTestModule } from '../../../test.module';
import { User1DetailComponent } from 'app/entities/user-1/user-1-detail.component';
import { User1 } from 'app/shared/model/user-1.model';

describe('Component Tests', () => {
  describe('User1 Management Detail Component', () => {
    let comp: User1DetailComponent;
    let fixture: ComponentFixture<User1DetailComponent>;
    const route = ({ data: of({ user1: new User1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentAppTestModule],
        declarations: [User1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(User1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(User1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.user1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
