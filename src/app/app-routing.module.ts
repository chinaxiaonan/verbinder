import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { KgraphComponent } from './kgraph/kgraph.component';
import { RequirementComponent } from './requirement/requirement.component';
import { IndustryComponent } from './industry/industry.component';
import { SearchComponent } from './search/search.component';
import { SecondlevelComponent } from './secondlevel/secondlevel.component';
import { CaseComponent } from './case/case.component';
import { BookmarklistComponent } from './bookmarklist/bookmarklist.component';
import { BookmarkfolderComponent } from './bookmarkfolder/bookmarkfolder.component';

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
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'industry',
    component: SecondlevelComponent
  },
  {
    path: 'technology',
    component: SecondlevelComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: 'case',
    component: CaseComponent
  },
  {
    path: 'bookmarklist',
    component: BookmarklistComponent
  },
  {
    path: 'bookmarkfolder',
    component: BookmarkfolderComponent
  },
  {
    path: 'kgraph',
    component: KgraphComponent
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
