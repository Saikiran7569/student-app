import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentAppSharedModule } from 'app/shared/shared.module';
import { User1Component } from './user-1.component';
import { User1DetailComponent } from './user-1-detail.component';
import { User1UpdateComponent } from './user-1-update.component';
import { User1DeletePopupComponent, User1DeleteDialogComponent } from './user-1-delete-dialog.component';
import { user1Route, user1PopupRoute } from './user-1.route';

const ENTITY_STATES = [...user1Route, ...user1PopupRoute];

@NgModule({
  imports: [StudentAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [User1Component, User1DetailComponent, User1UpdateComponent, User1DeleteDialogComponent, User1DeletePopupComponent],
  entryComponents: [User1DeleteDialogComponent]
})
export class StudentAppUser1Module {}
