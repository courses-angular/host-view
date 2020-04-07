import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

interface IUserTemplateContext {
    user: IUser;
    isFirst: boolean;
    isLast: boolean;
    isEven: boolean;
    isOdd: boolean;
}

interface IUser {
    name: string;
    email: string;
}

@Component({
    selector: 'app-root',
    template: `
        <h2>App work</h2>
        <ng-container #container></ng-container>
        <!--        <h2>Template Content</h2>-->
        <ng-template #userTemplate
                     let-user="user"
                     let-isFirst="isFirst"
                     let-isLast="isLast"
                     let-isEven="isEven"
                     let-isOdd="isOdd">

            <div [ngClass]="{'first': isFirst,'last':isLast,'even': isEven,'odd': isOdd}">
                <h2>{{user.name}}</h2>
                <h3>{{user.email}}</h3>
            </div>
        </ng-template>
        <!--        <div *ngFor="let user of users;index as i;template userTemplate"></div>-->

    `,
    styles: [
            `
            .first {
                color: red;
            }

            .last {
                color: green;
            }
          .even {
            background: cornflowerblue;
          }
          .odd{
            background: darkcyan;
            color: #fff;
          }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    // @ViewChild(TemplateRef) template: TemplateRef<IUserTemplateContext>; if there's one <ng-template></ng-template> in page
    @ViewChild('userTemplate') template: TemplateRef<IUserTemplateContext>;

    users = [
        {name: 'Nir', email: 'nir@gmail.com'},
        {name: 'Alex', email: 'alex@gmail.com'},
        {name: 'Yoav', email: 'yoav@gmail.com'}
    ];

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        // const view: EmbeddedViewRef<any> = this.template.createEmbeddedView(null);
        // this.container.insert(view);
        // this.container.createEmbeddedView(this.template);
        for (let i = 0; i < this.users.length; i++) {
            this.container.createEmbeddedView(this.template, {
                user: this.users[i],
                isFirst: i === 0,
                isLast: i === this.users.length - 1,
                isEven: i % 2 !== 0,
                isOdd: i % 2 === 0
            });
        }
        this.cdr.detectChanges();
    }
}
