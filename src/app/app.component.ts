import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';





@Component({
    selector: 'app-root',
    template: `
        <h2>App work</h2>
        <ng-container #container></ng-container>
        <yl-child></yl-child>
    `,
    styles: [

    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
   @ViewChild('container',{read: ViewContainerRef}) container: ViewContainerRef

    constructor() {
    }

    ngAfterViewInit(): void {

    }
}
