import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving: boolean;
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    age: [],
    rollNumber: [null, [Validators.required]],
    dateOfBirth: [],
    designation: []
  });

  constructor(protected studentService: StudentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
    });
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      address: student.address,
      age: student.age,
      rollNumber: student.rollNumber,
      dateOfBirth: student.dateOfBirth,
      designation: student.designation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      address: this.editForm.get(['address']).value,
      age: this.editForm.get(['age']).value,
      rollNumber: this.editForm.get(['rollNumber']).value,
      dateOfBirth: this.editForm.get(['dateOfBirth']).value,
      designation: this.editForm.get(['designation']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
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
