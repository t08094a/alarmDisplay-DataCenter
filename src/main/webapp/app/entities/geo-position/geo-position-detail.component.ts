import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeoPosition } from 'app/shared/model/geo-position.model';

@Component({
    selector: 'jhi-geo-position-detail',
    templateUrl: './geo-position-detail.component.html'
})
export class GeoPositionDetailComponent implements OnInit {
    geoPosition: IGeoPosition;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ geoPosition }) => {
            this.geoPosition = geoPosition;
        });
    }

    previousState() {
        window.history.back();
    }
}
