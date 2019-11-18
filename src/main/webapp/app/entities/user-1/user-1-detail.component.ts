import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser1 } from 'app/shared/model/user-1.model';

@Component({
  selector: 'jhi-user-1-detail',
  templateUrl: './user-1-detail.component.html'
})
export class User1DetailComponent implements OnInit {
  user1: IUser1;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user1 }) => {
      this.user1 = user1;
    });
  }

  previousState() {
    window.history.back();
  }
}
