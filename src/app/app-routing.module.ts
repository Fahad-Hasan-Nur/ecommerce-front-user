import { CartModule } from './views/cart/cart.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { URL_NAME } from './common/constants/nav.constants';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { AuthGuard } from './common/service/auth/auth.guard';
import { P404Component } from './common/components/error/404.component';
import { UnauthorizedComponent } from './common/components/error/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: URL_NAME.HOME,
        pathMatch: 'full',
      },
       {
        path: URL_NAME.HOME,
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: URL_NAME.HOME+'/:id',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      },
       {
        path: URL_NAME.CHECKOUT,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: URL_NAME.CART,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: URL_NAME.ORDER,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)
      },
    ],
  },
 
  {
    path: 'not-found',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'page-not-found',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
    
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'Page 403'
    }
  },
  
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    paramsInheritanceStrategy: 'always',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('app-module loaded');
  }
}
