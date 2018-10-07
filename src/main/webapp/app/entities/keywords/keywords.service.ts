import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKeywords } from 'app/shared/model/keywords.model';

type EntityResponseType = HttpResponse<IKeywords>;
type EntityArrayResponseType = HttpResponse<IKeywords[]>;

@Injectable({ providedIn: 'root' })
export class KeywordsService {
    private resourceUrl = SERVER_API_URL + 'api/keywords';

    constructor(private http: HttpClient) {}

    create(keywords: IKeywords): Observable<EntityResponseType> {
        return this.http.post<IKeywords>(this.resourceUrl, keywords, { observe: 'response' });
    }

    update(keywords: IKeywords): Observable<EntityResponseType> {
        return this.http.put<IKeywords>(this.resourceUrl, keywords, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IKeywords>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IKeywords[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
