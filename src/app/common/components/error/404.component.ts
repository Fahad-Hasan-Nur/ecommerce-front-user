import { Component } from '@angular/core';
import { URL } from '../../constants/nav.constants';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor() { }

  home(){
    window.location.replace(window.location.href.replace(URL.HOME, URL.HOME));
  }
}
