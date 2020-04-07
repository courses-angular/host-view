import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector, OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ChildComponent} from "./child.component";
import {WidgetComponent} from "./widget.component";


@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <div class="row">
                <div class="col" style="border-right: 1px dashed black">
                    <h3>Left Column</h3>
                    <ng-container #leftContainer></ng-container>
                </div>
                <div class="col">
                    <h3>Right Column</h3>
                    <button class="btn btn-outline-primary" (click)="createWidget()">Create</button>
                    <ng-container #rightContainer></ng-container>

                    <!--                 <yl-widget title="Widget"></yl-widget>-->
                </div>
            </div>
        </div>

    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild('rightContainer', {read: ViewContainerRef}) rightContainer: ViewContainerRef;
    @ViewChild('leftContainer', {read: ViewContainerRef}) leftContainer: ViewContainerRef;

    private widgetFactory: ComponentFactory<WidgetComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector) {
    }

    ngOnInit(): void {
        this.widgetFactory = this.componentFactoryResolver.resolveComponentFactory<WidgetComponent>(WidgetComponent)
    }

    ngAfterViewInit(): void {


    }

    createWidget() {
        const widgetComponent = this.widgetFactory.create(this.injector);
        const widgetHostView = this.rightContainer.insert(widgetComponent.hostView);
        widgetComponent.instance.title = 'New Widget';
        widgetComponent.instance.viewRef = widgetHostView;
        widgetComponent.instance.switch = this.switch.bind(this);

    }

    switch(widget: WidgetComponent) {
        let widgetViewRef = widget.viewRef;

        if (this.rightContainer.indexOf(widgetViewRef) >= 0) {
            // Move to left column
            widget.viewRef = this.leftContainer.insert(this.rightContainer.detach(
                this.rightContainer.indexOf(widgetViewRef)
            ))
        }
        if (this.leftContainer.indexOf(widgetViewRef) >= 0) {
            // Move to right column
            widget.viewRef = this.rightContainer.insert(this.leftContainer.detach(
                this.leftContainer.indexOf(widgetViewRef)
            ))
        }
    }
}
