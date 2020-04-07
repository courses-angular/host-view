import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'yl-child',
  template: `
    <p>
    {{title}}
    </p>
  `,
  styles: [],
})
export class ChildComponent   {
  title = 'Child Component';
  constructor() { }



}
