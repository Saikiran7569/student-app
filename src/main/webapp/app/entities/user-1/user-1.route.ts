import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User1 } from 'app/shared/model/user-1.model';
import { User1Service } from './user-1.service';
import { User1Component } from './user-1.component';
import { User1DetailComponent } from './user-1-detail.component';
import { User1UpdateComponent } from './user-1-update.component';
import { User1DeletePopupComponent } from './user-1-delete-dialog.component';
import { IUser1 } from 'app/shared/model/user-1.model';

@Injectable({ providedIn: 'root' })
export class User1Resolve implements Resolve<IUser1> {
  constructor(private service: User1Service) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser1> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((user1: HttpResponse<User1>) => user1.body));
    }
    return of(new User1());
  }
}

export const user1Route: Routes = [
  {
    path: '',
    component: User1Component,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.user1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: User1DetailComponent,
    resolve: {
      user1: User1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.user1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: User1UpdateComponent,
    resolve: {
      user1: User1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.user1.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: User1UpdateComponent,
    resolve: {
      user1: User1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.user1.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const user1PopupRoute: Routes = [
  {
    path: ':id/delete',
    component: User1DeletePopupComponent,
    resolve: {
      user1: User1Resolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.user1.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
