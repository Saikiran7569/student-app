import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser1, User1 } from 'app/shared/model/user-1.model';
import { User1Service } from './user-1.service';

@Component({
  selector: 'jhi-user-1-update',
  templateUrl: './user-1-update.component.html'
})
export class User1UpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(255)]]
  });

  constructor(protected user1Service: User1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ user1 }) => {
      this.updateForm(user1);
    });
  }

  updateForm(user1: IUser1) {
    this.editForm.patchValue({
      id: user1.id,
      name: user1.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const user1 = this.createFromForm();
    if (user1.id !== undefined) {
      this.subscribeToSaveResponse(this.user1Service.update(user1));
    } else {
      this.subscribeToSaveResponse(this.user1Service.create(user1));
    }
  }

  private createFromForm(): IUser1 {
    return {
      ...new User1(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser1>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
