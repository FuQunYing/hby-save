import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouteRoutingModule} from './routes-routing.module';

// PAGES
import {ShopComponent} from './shop/shop.component';
import {ErrorComponent} from './error/error.component';
import {SuccessComponent} from './success/success.component';

// COMPONENTS
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CartControlComponent} from './cart-control/cart-control.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {GoodsComponent} from './goods-list/goods.component';

const COMPONENTS = [
  ShoppingCartComponent,
  CartControlComponent,
  GoodsListComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ShopComponent,
    ErrorComponent,
    GoodsComponent,
    SuccessComponent
  ],
  entryComponents: [
    GoodsComponent
  ]
})
export class RoutesModule {
}
