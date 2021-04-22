
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MENU_NAME, URL_NAME } from 'src/app/common/constants/nav.constants';
import { OrderComponent } from './order.component';
const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
