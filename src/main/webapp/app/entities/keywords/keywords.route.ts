import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Keywords } from 'app/shared/model/keywords.model';
import { KeywordsService } from './keywords.service';
import { KeywordsComponent } from './keywords.component';
import { KeywordsDetailComponent } from './keywords-detail.component';
import { KeywordsUpdateComponent } from './keywords-update.component';
import { KeywordsDeletePopupComponent } from './keywords-delete-dialog.component';
import { IKeywords } from 'app/shared/model/keywords.model';

@Injectable({ providedIn: 'root' })
export class KeywordsResolve implements Resolve<IKeywords> {
    constructor(private service: KeywordsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((keywords: HttpResponse<Keywords>) => keywords.body));
        }
        return of(new Keywords());
    }
}

export const keywordsRoute: Routes = [
    {
        path: 'keywords',
        component: KeywordsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keywords/:id/view',
        component: KeywordsDetailComponent,
        resolve: {
            keywords: KeywordsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keywords/new',
        component: KeywordsUpdateComponent,
        resolve: {
            keywords: KeywordsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'keywords/:id/edit',
        component: KeywordsUpdateComponent,
        resolve: {
            keywords: KeywordsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keywordsPopupRoute: Routes = [
    {
        path: 'keywords/:id/delete',
        component: KeywordsDeletePopupComponent,
        resolve: {
            keywords: KeywordsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
