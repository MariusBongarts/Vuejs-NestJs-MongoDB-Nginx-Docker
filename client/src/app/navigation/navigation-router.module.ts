import { NavigationComponent } from './navigation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/**
 * Loa
 */
const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
