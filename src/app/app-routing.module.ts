import { CartModule } from './views/cart/cart.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { URL_NAME } from './common/constants/nav.constants';
import { CheckoutComponent } from './views/checkout/checkout.component';

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
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      },
       {
        path: URL_NAME.CHECKOUT,
        loadChildren: () => import('./views/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: URL_NAME.CART,
        loadChildren: () => import('./views/cart/cart.module').then(m => m.CartModule)
      },
      // {
      //   path: URL_NAME.SUB_CATEGORY,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/sub-category/sub-category.module').then(m => m.SubCategoryModule)
      // },
      // {
      //   path: URL_NAME.EMPLOYEE,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule),
      // },
      // {
      //   path: URL_NAME.PRODUCT,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule)
      // },
      // {
      //   path: URL_NAME.BRAND,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/brand/brand.module').then(m => m.BrandModule),
      // },
      // {
      //   path: URL_NAME.DEALER,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/dealer/dealer.module').then(m => m.DealerModule),
      // },
      // {
      //   path: URL_NAME.DEALER_MANAGER,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/dealer-manager/dealer-manager.module').then(m => m.DealerManagerModule),
      // },
      // {
      //   path: URL_NAME.INVENTORY,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/inventory/inventory.module').then(m => m.InventoryModule),
      // },
      // {
      //   path: URL_NAME.ACCOUNTS,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/accounts/accounts.module').then(m => m.AccountsModule),
      // },
    ],
  },
 
  // {
  //   path: 'not-found',
  //   component: P404Component,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: 'page-not-found',
  //   component: P500Component,
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
    // {
    // path: 'checkout',
    // component: CheckoutComponent,
    // data: {
    //   title: 'Checkout'
    // }
  // },
  // {
  //   path: 'unauthorized',
  //   component: UnauthorizedComponent,
  //   data: {
  //     title: 'Page 403'
  //   }
  // },
  // {
  //   path: 'service-test',
  //   component: UserTestComponent,
  //   data: {
  //     title: 'Server Test'
  //   }
  // },
  // {
  //   path: '**',
  //   redirectTo: 'not-found',
  //   pathMatch: 'full'
  // }
    
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
