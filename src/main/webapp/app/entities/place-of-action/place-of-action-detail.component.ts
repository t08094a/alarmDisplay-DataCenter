import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaceOfAction } from 'app/shared/model/place-of-action.model';

@Component({
    selector: 'jhi-place-of-action-detail',
    templateUrl: './place-of-action-detail.component.html'
})
export class PlaceOfActionDetailComponent implements OnInit {
    placeOfAction: IPlaceOfAction;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ placeOfAction }) => {
            this.placeOfAction = placeOfAction;
        });
    }

    previousState() {
        window.history.back();
    }
}
