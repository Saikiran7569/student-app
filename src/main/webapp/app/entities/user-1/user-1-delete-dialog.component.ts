import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUser1 } from 'app/shared/model/user-1.model';
import { User1Service } from './user-1.service';

@Component({
  selector: 'jhi-user-1-delete-dialog',
  templateUrl: './user-1-delete-dialog.component.html'
})
export class User1DeleteDialogComponent {
  user1: IUser1;

  constructor(protected user1Service: User1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.user1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'user1ListModification',
        content: 'Deleted an user1'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-1-delete-popup',
  template: ''
})
export class User1DeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user1 }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(User1DeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.user1 = user1;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/user-1', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/user-1', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
