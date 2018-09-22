import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlarmInfo } from 'app/shared/model/alarm-info.model';
import { AlarmInfoService } from './alarm-info.service';
import { AlarmInfoComponent } from './alarm-info.component';
import { AlarmInfoDetailComponent } from './alarm-info-detail.component';
import { AlarmInfoUpdateComponent } from './alarm-info-update.component';
import { AlarmInfoDeletePopupComponent } from './alarm-info-delete-dialog.component';
import { IAlarmInfo } from 'app/shared/model/alarm-info.model';

@Injectable({ providedIn: 'root' })
export class AlarmInfoResolve implements Resolve<IAlarmInfo> {
    constructor(private service: AlarmInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((alarmInfo: HttpResponse<AlarmInfo>) => alarmInfo.body));
        }
        return of(new AlarmInfo());
    }
}

export const alarmInfoRoute: Routes = [
    {
        path: 'alarm-info',
        component: AlarmInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alarm-info/:id/view',
        component: AlarmInfoDetailComponent,
        resolve: {
            alarmInfo: AlarmInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alarm-info/new',
        component: AlarmInfoUpdateComponent,
        resolve: {
            alarmInfo: AlarmInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alarm-info/:id/edit',
        component: AlarmInfoUpdateComponent,
        resolve: {
            alarmInfo: AlarmInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alarmInfoPopupRoute: Routes = [
    {
        path: 'alarm-info/:id/delete',
        component: AlarmInfoDeletePopupComponent,
        resolve: {
            alarmInfo: AlarmInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
