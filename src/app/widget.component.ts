import {Component, Input, OnInit, ViewRef} from '@angular/core';

@Component({
    selector: 'yl-widget',
    template: `
        <div class="card my-3">
            <div class="card-body">
                <h5 class="card-title">{{title}} {{count}}</h5>

                <button class="btn btn-sm btn-success mr-1" (click)="increase()">UP</button>
                <button class="btn btn-sm btn-info mr-1" (click)="decrease()">DOWN</button>
                <button class="btn btn-sm btn-outline-primary mr-1" (click)="switch(this)">Switch</button>
                <button class="btn btn-sm btn-outline-danger mr-1" (click)="edit(this)">Edit</button>
            </div>
        </div>
    `,
    styles: []
})
export class WidgetComponent implements OnInit {
    @Input() title: string;

    count: number;
    viewRef: ViewRef;
    @Input()switch: Function;
    @Input()edit: Function;

    constructor() {
    }

    ngOnInit(): void {
        this.count = 0;
    }

    increase() {
        this.count++;
    }

    decrease() {
        this.count--;
    }


}
