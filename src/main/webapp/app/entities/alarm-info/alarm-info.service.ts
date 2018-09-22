import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlarmInfo } from 'app/shared/model/alarm-info.model';

type EntityResponseType = HttpResponse<IAlarmInfo>;
type EntityArrayResponseType = HttpResponse<IAlarmInfo[]>;

@Injectable({ providedIn: 'root' })
export class AlarmInfoService {
    private resourceUrl = SERVER_API_URL + 'api/alarm-infos';

    constructor(private http: HttpClient) {}

    create(alarmInfo: IAlarmInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(alarmInfo);
        return this.http
            .post<IAlarmInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(alarmInfo: IAlarmInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(alarmInfo);
        return this.http
            .put<IAlarmInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAlarmInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAlarmInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(alarmInfo: IAlarmInfo): IAlarmInfo {
        const copy: IAlarmInfo = Object.assign({}, alarmInfo, {
            time: alarmInfo.time != null && alarmInfo.time.isValid() ? alarmInfo.time.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.time = res.body.time != null ? moment(res.body.time) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((alarmInfo: IAlarmInfo) => {
            alarmInfo.time = alarmInfo.time != null ? moment(alarmInfo.time) : null;
        });
        return res;
    }
}
