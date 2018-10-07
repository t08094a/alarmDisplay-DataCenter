import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeywords } from 'app/shared/model/keywords.model';

@Component({
    selector: 'jhi-keywords-detail',
    templateUrl: './keywords-detail.component.html'
})
export class KeywordsDetailComponent implements OnInit {
    keywords: IKeywords;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ keywords }) => {
            this.keywords = keywords;
        });
    }

    previousState() {
        window.history.back();
    }
}
