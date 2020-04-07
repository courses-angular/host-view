import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yl-child',
  template: `
    <p>
      child works!
    </p>
  `,
  styles: []
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
