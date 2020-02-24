import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/**
 * Load the NavigationModule
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
