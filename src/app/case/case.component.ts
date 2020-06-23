import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { IShareEvent } from '../shareinterface';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit, IShareEvent {
  resourceBasePath = "./assets/prod/";
  caseitem;
  contactshowed:boolean = false;
  bsBookmarkPanel:BsModalRef;

  constructor(private httpRequest: HttprequestService, private router: ActivatedRoute, private translateService:TranslateService,
    private messageService: NzMessageService, private bsModalService:BsModalService) {
    this.caseitem = {
      id: -1,
      name: '',
      desctext: '',
      requirement: '',
      custval: '',
      techdesc: '',
      imgpath: '',
      customer: '',
      contact: '',
      techname: '',
      indname: ''
    }
  }

  ngOnInit() {
    var cid = this.router.snapshot.queryParams['id'];
    if (cid) {
      this.loadCaseById(cid);
    }
  }

  loadCaseById(cid): void {
    var user = JSON.parse(sessionStorage.getItem("loginuser"));
    if(user){
      this.httpRequest.loadCase(cid, data=>this.caseCallback(data), user.uid);
    }
    else {
      this.httpRequest.loadCase(cid, data=>this.caseCallback(data));
    }
    
  }

  caseCallback(data): void{
    if (data.status === 1) {
      console.log(data);
      this.caseitem = data.case;
      this.caseitem.imgpath = this.resourceBasePath + this.caseitem.imgpath;
    }
  }

  showContact(): void{
    this.contactshowed = true;
  }

  toggleBookmark(caseitem): void {
    var userstr = sessionStorage.getItem("loginuser");
    if(!userstr){
      this.translateService.get("ver.main.login.notlogin").subscribe(str=>{
        this.messageService.info(str);
      });
      return;
    }
    const initialState = {
      caseid: caseitem.id,
      callbackFunc: this
    };
    if(!caseitem.bookmarked){
      this.bsBookmarkPanel = this.bsModalService.show(BookmarkComponent, {
        class: 'modal-dialog-centered',
        initialState:initialState
      });
    }
    else {
    }
    
  }

  triggerEvent(event:number):void {
    if(event === 1){
      this.caseitem.bookmarked = true;
    }
  }

}
