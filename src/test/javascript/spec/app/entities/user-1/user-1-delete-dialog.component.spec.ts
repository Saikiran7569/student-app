import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StudentAppTestModule } from '../../../test.module';
import { User1DeleteDialogComponent } from 'app/entities/user-1/user-1-delete-dialog.component';
import { User1Service } from 'app/entities/user-1/user-1.service';

describe('Component Tests', () => {
  describe('User1 Management Delete Component', () => {
    let comp: User1DeleteDialogComponent;
    let fixture: ComponentFixture<User1DeleteDialogComponent>;
    let service: User1Service;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentAppTestModule],
        declarations: [User1DeleteDialogComponent]
      })
        .overrideTemplate(User1DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(User1DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(User1Service);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
