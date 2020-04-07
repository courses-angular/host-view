import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ComponentFactory, ComponentFactoryResolver, OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ChildComponent} from "./child.component";





@Component({
    selector: 'app-root',
    template: `
        <h2>App work</h2>
        <ng-container #container></ng-container>
    `,
    styles: [

    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {
   @ViewChild('container',{read: ViewContainerRef}) container: ViewContainerRef
    private childFactory: ComponentFactory<ChildComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }
    ngOnInit(): void {
     this.childFactory =  this.componentFactoryResolver.resolveComponentFactory(ChildComponent);
    }

    ngAfterViewInit(): void {
       this.container.createComponent(this.childFactory);

    }
}
