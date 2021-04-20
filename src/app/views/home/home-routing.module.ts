import { HomeViewComponent } from './component/home-view/home-view.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MENU_NAME, URL_NAME } from 'src/app/common/constants/nav.constants';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:  '',
        component:  HomeViewComponent,
        data: {
          title: MENU_NAME.HOME
        }
      },
      {
      path:  URL_NAME.PRODUCTVIEW,
      component:  ProductViewComponent,
      data: {
        title: MENU_NAME.PRODUCTVIEW
      }
    }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
