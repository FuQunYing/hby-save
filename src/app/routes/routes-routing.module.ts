import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShopComponent} from './shop/shop.component';
import {ErrorComponent} from './error/error.component';
import {AuthGuardService} from '../service/auth-guard.service';
import {SuccessComponent} from './success/success.component';


const routes: Routes = [
  {path: '', redirectTo: '/shop', pathMatch: 'full'},
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuardService]},
  {path: 'error', component: ErrorComponent},
  {path: 'success', component: SuccessComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class RouteRoutingModule {
}
