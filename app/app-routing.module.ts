import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Following routing issues and the process of looking for solutions all routes are now define in distinct modules.
const routes: Routes = [
    
    ////{ path: '', component: StockModule }
    //{
    //    path: '',
    //    loadChildren: () =>
    //        import('./stock/stock.module').then((m) => m.StockModule)
    //}
    //{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
