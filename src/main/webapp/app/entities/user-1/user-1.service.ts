import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser1 } from 'app/shared/model/user-1.model';

type EntityResponseType = HttpResponse<IUser1>;
type EntityArrayResponseType = HttpResponse<IUser1[]>;

@Injectable({ providedIn: 'root' })
export class User1Service {
  public resourceUrl = SERVER_API_URL + 'api/user-1-s';

  constructor(protected http: HttpClient) {}

  create(user1: IUser1): Observable<EntityResponseType> {
    return this.http.post<IUser1>(this.resourceUrl, user1, { observe: 'response' });
  }

  update(user1: IUser1): Observable<EntityResponseType> {
    return this.http.put<IUser1>(this.resourceUrl, user1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
