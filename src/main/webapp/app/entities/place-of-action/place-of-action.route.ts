import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceOfAction } from 'app/shared/model/place-of-action.model';
import { PlaceOfActionService } from './place-of-action.service';
import { PlaceOfActionComponent } from './place-of-action.component';
import { PlaceOfActionDetailComponent } from './place-of-action-detail.component';
import { PlaceOfActionUpdateComponent } from './place-of-action-update.component';
import { PlaceOfActionDeletePopupComponent } from './place-of-action-delete-dialog.component';
import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';

@Injectable({ providedIn: 'root' })
export class PlaceOfActionResolve implements Resolve<IPlaceOfAction> {
    constructor(private service: PlaceOfActionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((placeOfAction: HttpResponse<PlaceOfAction>) => placeOfAction.body));
        }
        return of(new PlaceOfAction());
    }
}

export const placeOfActionRoute: Routes = [
    {
        path: 'place-of-action',
        component: PlaceOfActionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.placeOfAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place-of-action/:id/view',
        component: PlaceOfActionDetailComponent,
        resolve: {
            placeOfAction: PlaceOfActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.placeOfAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place-of-action/new',
        component: PlaceOfActionUpdateComponent,
        resolve: {
            placeOfAction: PlaceOfActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.placeOfAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place-of-action/:id/edit',
        component: PlaceOfActionUpdateComponent,
        resolve: {
            placeOfAction: PlaceOfActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.placeOfAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const placeOfActionPopupRoute: Routes = [
    {
        path: 'place-of-action/:id/delete',
        component: PlaceOfActionDeletePopupComponent,
        resolve: {
            placeOfAction: PlaceOfActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.placeOfAction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
