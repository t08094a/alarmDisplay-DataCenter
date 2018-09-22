import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommonInfo } from 'app/shared/model/common-info.model';

type EntityResponseType = HttpResponse<ICommonInfo>;
type EntityArrayResponseType = HttpResponse<ICommonInfo[]>;

@Injectable({ providedIn: 'root' })
export class CommonInfoService {
    private resourceUrl = SERVER_API_URL + 'api/common-infos';

    constructor(private http: HttpClient) {}

    create(commonInfo: ICommonInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(commonInfo);
        return this.http
            .post<ICommonInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(commonInfo: ICommonInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(commonInfo);
        return this.http
            .put<ICommonInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICommonInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICommonInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(commonInfo: ICommonInfo): ICommonInfo {
        const copy: ICommonInfo = Object.assign({}, commonInfo, {
            showStartDate:
                commonInfo.showStartDate != null && commonInfo.showStartDate.isValid()
                    ? commonInfo.showStartDate.format(DATE_FORMAT)
                    : null,
            showEndDate:
                commonInfo.showEndDate != null && commonInfo.showEndDate.isValid() ? commonInfo.showEndDate.format(DATE_FORMAT) : null,
            alarmRelevantStartDate:
                commonInfo.alarmRelevantStartDate != null && commonInfo.alarmRelevantStartDate.isValid()
                    ? commonInfo.alarmRelevantStartDate.format(DATE_FORMAT)
                    : null,
            alarmRelevantEndDate:
                commonInfo.alarmRelevantEndDate != null && commonInfo.alarmRelevantEndDate.isValid()
                    ? commonInfo.alarmRelevantEndDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.showStartDate = res.body.showStartDate != null ? moment(res.body.showStartDate) : null;
        res.body.showEndDate = res.body.showEndDate != null ? moment(res.body.showEndDate) : null;
        res.body.alarmRelevantStartDate = res.body.alarmRelevantStartDate != null ? moment(res.body.alarmRelevantStartDate) : null;
        res.body.alarmRelevantEndDate = res.body.alarmRelevantEndDate != null ? moment(res.body.alarmRelevantEndDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((commonInfo: ICommonInfo) => {
            commonInfo.showStartDate = commonInfo.showStartDate != null ? moment(commonInfo.showStartDate) : null;
            commonInfo.showEndDate = commonInfo.showEndDate != null ? moment(commonInfo.showEndDate) : null;
            commonInfo.alarmRelevantStartDate =
                commonInfo.alarmRelevantStartDate != null ? moment(commonInfo.alarmRelevantStartDate) : null;
            commonInfo.alarmRelevantEndDate = commonInfo.alarmRelevantEndDate != null ? moment(commonInfo.alarmRelevantEndDate) : null;
        });
        return res;
    }
}
