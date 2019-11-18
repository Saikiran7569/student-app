import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IUser1 } from 'app/shared/model/user-1.model';
import { User1Service } from './user-1.service';

@Component({
  selector: 'jhi-user-1',
  templateUrl: './user-1.component.html'
})
export class User1Component implements OnInit, OnDestroy {
  user1S: IUser1[];
  eventSubscriber: Subscription;

  constructor(protected user1Service: User1Service, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.user1Service.query().subscribe((res: HttpResponse<IUser1[]>) => {
      this.user1S = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUser1S();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUser1) {
    return item.id;
  }

  registerChangeInUser1S() {
    this.eventSubscriber = this.eventManager.subscribe('user1ListModification', () => this.loadAll());
  }
}
