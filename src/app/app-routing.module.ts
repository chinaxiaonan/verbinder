import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './process/process.component';
import { HomeComponent } from './home/home.component';
import { RequirementComponent } from './requirement/requirement.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  } ,
  {
    path: 'process',
    component: ProcessComponent
  }
  // ,{
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
