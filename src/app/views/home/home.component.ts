
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
