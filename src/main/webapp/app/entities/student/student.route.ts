import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentUpdateComponent } from './student-update.component';
import { StudentDeletePopupComponent } from './student-delete-dialog.component';
import { IStudent } from 'app/shared/model/student.model';

@Injectable({ providedIn: 'root' })
export class StudentResolve implements Resolve<IStudent> {
  constructor(private service: StudentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudent> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((student: HttpResponse<Student>) => student.body));
    }
    return of(new Student());
  }
}

export const studentRoute: Routes = [
  {
    path: '',
    component: StudentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'studentApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudentDetailComponent,
    resolve: {
      student: StudentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudentUpdateComponent,
    resolve: {
      student: StudentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudentUpdateComponent,
    resolve: {
      student: StudentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const studentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StudentDeletePopupComponent,
    resolve: {
      student: StudentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'studentApp.student.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
