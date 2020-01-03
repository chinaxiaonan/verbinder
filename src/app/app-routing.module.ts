import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadpageComponent } from './uploadpage/uploadpage.component';
import { HomeComponent } from './home/home.component';
import { CorrelationComponent } from './correlation/correlation.component';
import { LinechartComponent } from './linechart/linechart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
  // ,
  // {
  //   path: 'uploadpage',
  //   component: UploadpageComponent
  // },
  // {
  //   path: 'correlation',
  //   component: CorrelationComponent
  // },
  // {
  //   path: 'linechart',
  //   component: LinechartComponent  
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
