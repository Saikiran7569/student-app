import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IUser1 } from 'app/shared/model/user-1.model';
import { User1Service } from 'app/entities/user-1/user-1.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  user1s: IUser1[];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.maxLength(255)]],
    hsCode: [null, [Validators.maxLength(20)]],
    skuCode: [null, [Validators.maxLength(20)]],
    countryOfOrg: [null, [Validators.maxLength(10)]],
    unitPrice: [],
    quantity: [null, [Validators.max(20)]],
    itemValue: [],
    createdDate: [],
    updatedDate: [],
    createdByUserId: [],
    user2Id: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected userService: UserService,
    protected user1Service: User1Service,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.user1Service
      .query()
      .subscribe((res: HttpResponse<IUser1[]>) => (this.user1s = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      description: product.description,
      hsCode: product.hsCode,
      skuCode: product.skuCode,
      countryOfOrg: product.countryOfOrg,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
      itemValue: product.itemValue,
      createdDate: product.createdDate != null ? product.createdDate.format(DATE_TIME_FORMAT) : null,
      updatedDate: product.updatedDate != null ? product.updatedDate.format(DATE_TIME_FORMAT) : null,
      createdByUserId: product.createdByUserId,
      user2Id: product.user2Id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      hsCode: this.editForm.get(['hsCode']).value,
      skuCode: this.editForm.get(['skuCode']).value,
      countryOfOrg: this.editForm.get(['countryOfOrg']).value,
      unitPrice: this.editForm.get(['unitPrice']).value,
      quantity: this.editForm.get(['quantity']).value,
      itemValue: this.editForm.get(['itemValue']).value,
      createdDate:
        this.editForm.get(['createdDate']).value != null ? moment(this.editForm.get(['createdDate']).value, DATE_TIME_FORMAT) : undefined,
      updatedDate:
        this.editForm.get(['updatedDate']).value != null ? moment(this.editForm.get(['updatedDate']).value, DATE_TIME_FORMAT) : undefined,
      createdByUserId: this.editForm.get(['createdByUserId']).value,
      user2Id: this.editForm.get(['user2Id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackUser1ById(index: number, item: IUser1) {
    return item.id;
  }
}
