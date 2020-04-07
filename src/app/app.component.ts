import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector, OnInit,
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

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                private cdr: ChangeDetectorRef) {
    }
    ngOnInit(): void {
     this.childFactory =  this.componentFactoryResolver.resolveComponentFactory(ChildComponent);
    }

    ngAfterViewInit(): void {
        const childComponent: ComponentRef<ChildComponent> = this.childFactory.create(this.injector);
        console.log(childComponent);
        childComponent.instance.title = 'Instance of child component';
        this.container.insert(childComponent.hostView);
       // this.container.createComponent(this.childFactory);
        this.cdr.detectChanges();

    }
}
