import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationRoutingModule } from './navigation-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';

// Angular Material imports
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    NavigationComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    NavigationRoutingModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class NavigationModule { }
