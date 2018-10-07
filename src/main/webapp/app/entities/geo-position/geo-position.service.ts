import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGeoPosition } from 'app/shared/model/geo-position.model';

type EntityResponseType = HttpResponse<IGeoPosition>;
type EntityArrayResponseType = HttpResponse<IGeoPosition[]>;

@Injectable({ providedIn: 'root' })
export class GeoPositionService {
    private resourceUrl = SERVER_API_URL + 'api/geo-positions';

    constructor(private http: HttpClient) {}

    create(geoPosition: IGeoPosition): Observable<EntityResponseType> {
        return this.http.post<IGeoPosition>(this.resourceUrl, geoPosition, { observe: 'response' });
    }

    update(geoPosition: IGeoPosition): Observable<EntityResponseType> {
        return this.http.put<IGeoPosition>(this.resourceUrl, geoPosition, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGeoPosition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGeoPosition[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
