import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResultComponent } from './result/result.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ResourceComponent } from './resource/resource.component';
import { KgraphComponent } from './kgraph/kgraph.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SearchComponent } from './search/search.component';
import { TopheaderComponent } from './topheader/topheader.component';
import { RequirementComponent } from './requirement/requirement.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CaseComponent } from './case/case.component';
import { IndustryComponent } from './industry/industry.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { LoginComponent } from './login/login.component';
import { SecondlevelComponent } from './secondlevel/secondlevel.component';
import { BookmarklistComponent } from './bookmarklist/bookmarklist.component';
import { BookmarkfolderComponent } from './bookmarkfolder/bookmarkfolder.component';

export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    HomeComponent,
    ResourceComponent,
    KgraphComponent,
    SearchComponent,
    TopheaderComponent,
    RequirementComponent,
    CaseComponent,
    IndustryComponent,
    BookmarkComponent,
    LoginComponent,
    SecondlevelComponent,
    BookmarklistComponent,
    BookmarkfolderComponent
    // CorrelationComponent,
    // LinechartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      defaultLanguage: 'zh'
    }),
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BookmarkComponent, LoginComponent]
})
export class AppModule { }
