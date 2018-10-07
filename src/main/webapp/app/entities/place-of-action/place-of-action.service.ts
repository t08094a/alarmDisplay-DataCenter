import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';

type EntityResponseType = HttpResponse<IPlaceOfAction>;
type EntityArrayResponseType = HttpResponse<IPlaceOfAction[]>;

@Injectable({ providedIn: 'root' })
export class PlaceOfActionService {
    private resourceUrl = SERVER_API_URL + 'api/place-of-actions';

    constructor(private http: HttpClient) {}

    create(placeOfAction: IPlaceOfAction): Observable<EntityResponseType> {
        return this.http.post<IPlaceOfAction>(this.resourceUrl, placeOfAction, { observe: 'response' });
    }

    update(placeOfAction: IPlaceOfAction): Observable<EntityResponseType> {
        return this.http.put<IPlaceOfAction>(this.resourceUrl, placeOfAction, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlaceOfAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlaceOfAction[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
