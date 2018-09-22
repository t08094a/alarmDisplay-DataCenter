import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonInfo } from 'app/shared/model/common-info.model';
import { CommonInfoService } from './common-info.service';
import { CommonInfoComponent } from './common-info.component';
import { CommonInfoDetailComponent } from './common-info-detail.component';
import { CommonInfoUpdateComponent } from './common-info-update.component';
import { CommonInfoDeletePopupComponent } from './common-info-delete-dialog.component';
import { ICommonInfo } from 'app/shared/model/common-info.model';

@Injectable({ providedIn: 'root' })
export class CommonInfoResolve implements Resolve<ICommonInfo> {
    constructor(private service: CommonInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((commonInfo: HttpResponse<CommonInfo>) => commonInfo.body));
        }
        return of(new CommonInfo());
    }
}

export const commonInfoRoute: Routes = [
    {
        path: 'common-info',
        component: CommonInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'common-info/:id/view',
        component: CommonInfoDetailComponent,
        resolve: {
            commonInfo: CommonInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'common-info/new',
        component: CommonInfoUpdateComponent,
        resolve: {
            commonInfo: CommonInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'common-info/:id/edit',
        component: CommonInfoUpdateComponent,
        resolve: {
            commonInfo: CommonInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commonInfoPopupRoute: Routes = [
    {
        path: 'common-info/:id/delete',
        component: CommonInfoDeletePopupComponent,
        resolve: {
            commonInfo: CommonInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
