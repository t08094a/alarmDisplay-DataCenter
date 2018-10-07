import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeoPosition } from 'app/shared/model/geo-position.model';
import { GeoPositionService } from './geo-position.service';
import { GeoPositionComponent } from './geo-position.component';
import { GeoPositionDetailComponent } from './geo-position-detail.component';
import { GeoPositionUpdateComponent } from './geo-position-update.component';
import { GeoPositionDeletePopupComponent } from './geo-position-delete-dialog.component';
import { IGeoPosition } from 'app/shared/model/geo-position.model';

@Injectable({ providedIn: 'root' })
export class GeoPositionResolve implements Resolve<IGeoPosition> {
    constructor(private service: GeoPositionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((geoPosition: HttpResponse<GeoPosition>) => geoPosition.body));
        }
        return of(new GeoPosition());
    }
}

export const geoPositionRoute: Routes = [
    {
        path: 'geo-position',
        component: GeoPositionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.geoPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'geo-position/:id/view',
        component: GeoPositionDetailComponent,
        resolve: {
            geoPosition: GeoPositionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.geoPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'geo-position/new',
        component: GeoPositionUpdateComponent,
        resolve: {
            geoPosition: GeoPositionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.geoPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'geo-position/:id/edit',
        component: GeoPositionUpdateComponent,
        resolve: {
            geoPosition: GeoPositionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.geoPosition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const geoPositionPopupRoute: Routes = [
    {
        path: 'geo-position/:id/delete',
        component: GeoPositionDeletePopupComponent,
        resolve: {
            geoPosition: GeoPositionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.geoPosition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
