import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { IShareEvent } from '../shareinterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, IShareEvent {
  @ViewChild('selectedIndustryText', {static:false}) selectedIndustryText : ElementRef;
  @ViewChild('searchdiv', {static:false}) searchdiv : ElementRef;
  resourceBasePath = "./assets/prod/";
  selectedIndustry;
  inputReq:string;
  industrieslist = [];
  technologieslist = [];
  caseslist = [];
  inputTags: Set<string>;
  inputIndustries: Set<object>;
  showTagPanel = false;
  showBookmarkPanel = false;
  bookmarkTargetObj;
  modifyingTag;
  tempStoredTag;
  bsModifyTagPanel:BsModalRef;
  bsBookmarkPanel:BsModalRef;
  displayrelevantdomain:Boolean = true;
  displayotherdomain:Boolean = true;
  dataoptions1 = [
    {label: '历史', value: '历史'},
    {label: '实时', value: '实时'},
    {label: '静态', value: '静态'}
  ];
  dataoptions2 = [
    {label: '观察', value: '观察'},
    {label: '设定', value: '设定'},
    {label: '标准', value: '标准'}
  ];
  dataoptions3 = [
    {label: '文本', value: '文本'},
    {label: '数值', value: '数值'},
    {label: '图像', value: '图像'},
    {label: '音频', value: '音频'},
    {label: '视频', value: '视频'}
  ];
  dataoptions4 = [
    {label: '主观意愿', value: '主观意愿'},
    {label: '客观困难', value: '客观困难'},
    {label: '行业准则', value: '行业准则'}
  ];
  showoptions:number = 0;
  showdatalabelfilter:boolean = false;

  constructor(private httprequest: HttprequestService, private el: ElementRef, private router:Router,
    private bsModalService:BsModalService, private messageService: NzMessageService, private translateService: TranslateService) { 
    this.inputTags = new Set<string>();
    this.inputIndustries = new Set<object>();
    this.selectedIndustry = {
      id: -1,
      tag: "所属行业"
    }
  }

  ngOnInit() {
    this.caseslist.push({
      id: -1,
      name: "",
      customer: "",
      pval: "",
      imgpath: "",
      indfields:[],
      techfields: [],
      bookmarked: false,
      isShow: false        
    });
  }

  ngAfterViewInit(): void {
    this.refreshSearchDivLayout();
    this.loadAllIndustries();
    this.loadAllTechnologies();
  }
  onselect(industry):void {
    console.log(industry);
    if(industry.id!==-1){
      this.selectedIndustryText.nativeElement.classList.remove('search-dropdown-hint');
    }
    else {
      this.selectedIndustryText.nativeElement.classList.add('search-dropdown-hint');
    }
    this.selectedIndustry = industry;

  }

  addIndustry(): void {
    if(this.selectedIndustry.id !== -1){
      this.inputIndustries.add(this.selectedIndustry);
    }
    
    if(this.inputIndustries.size>0){
      this.showTagPanel = true;
      this.refreshSearchDivLayout();
    }
  }

  removeIndustry(industry): void {
    this.inputIndustries.delete(industry);
    if(this.inputIndustries.size===0 && this.inputTags.size===0){
      this.showTagPanel = false;
      this.refreshSearchDivLayout();
    }
  }

  addTag():void {
    if(!this.inputReq||this.inputReq.length<=3){
      this.translateService.get("ver.search.errorshortreq").subscribe(str=>{
        this.messageService.error(str);
      });
      return;
    }
    else {
      this.inputTags.add(this.inputReq);
    }
    this.inputReq = "";
    if(this.inputTags.size>0){
      this.showTagPanel = true;
      this.refreshSearchDivLayout();
    }
  }

  removeTag(tag):void {
    this.inputTags.delete(tag);
    if(this.inputTags.size===0 && this.inputIndustries.size===0){
      this.showTagPanel = false;
      this.refreshSearchDivLayout();
    }
  }

  refreshSearchDivLayout(){
    if(this.showTagPanel){
      this.searchdiv.nativeElement.classList.remove('place-center');
      this.searchdiv.nativeElement.classList.add('place-left');
    }
    else {
      this.searchdiv.nativeElement.classList.remove('place-left');
      this.searchdiv.nativeElement.classList.add('place-center');
    }
  }

  loadAllIndustries(): void {
    this.httprequest.loadAllIndustries(false, datas=>{
      var results = datas['result'];
      results.forEach(result => {
        this.industrieslist.push({id:result.id, tag:result.name});
      });
    });
  }

  loadAllTechnologies(): void {
    this.httprequest.loadAllTechnologies(datas=>{
      var results = datas['result'];
      var temp = [];
      results.forEach(result => {
        temp.push({id:result.id, name:result.name, selected:false});
      });
      this.technologieslist = temp;
    })
  }

  loadBookmarks(uid:number):void {

  }

  loadCasesData(pageIndex: number): void {
  }

  toggleBookmark($event, caseitem): void {
    var userstr = sessionStorage.getItem("loginuser");
    if(!userstr){
      this.translateService.get("ver.main.login.notlogin").subscribe(str=>{
        this.messageService.info(str);
      });
      return;
    }
    this.bookmarkTargetObj = caseitem;
    const initialState = {
      caseid: caseitem.id,
      callbackFunc: this
    };
    if(!caseitem.bookmarked){
      //this.showBookmarkPanel = caseitem.bookmarked;
      this.bsBookmarkPanel = this.bsModalService.show(BookmarkComponent, {
        class: 'modal-dialog-centered',
        initialState:initialState
      });
    }
    else {
      //this.httprequest.removeBookmark(0, )
    }
    $event.stopPropagation();
  }

  triggerEvent(event: number):void {
    if(event === 1){ // callback event 1=add bookmark succ, 2=remove bookmark succ, 3=create folder succ, 4=delete folder succ
      this.bookmarkTargetObj.bookmarked = true;
    }
  }

  addBookmark(caseitem): void {
    this.el.nativeElement.querySelector("#icon_bookmark_"+caseitem.id)
  }

  bookmarkOk():void {
    this.showBookmarkPanel = false;
  }

  modifyTag(tag, modifyTagPanel): void {
    console.log("aaa");
    this.bsModifyTagPanel = this.bsModalService.show(modifyTagPanel);
    this.modifyingTag = tag;
    this.tempStoredTag = tag;
  }


  modifyTagOK(): void {
    this.inputTags.delete(this.tempStoredTag);
    this.inputTags.add(this.modifyingTag);
    this.tempStoredTag = "";
    this.bsModifyTagPanel.hide();
    console.log(this.inputTags);
  }

  toCaseDetail(caseitem):void {
    this.router.navigate(["case"],{queryParams:{id:caseitem.id}});
  }
  search(): void {
    if(this.inputTags.size===0){
      this.translateService.get("ver.search.errornoreqinput").subscribe(str=>{
        this.messageService.error(str);
      });
      return;
    }
    var query = [];
    this.inputTags.forEach(tag=>{
      query.push(tag);
    });
    var user = JSON.parse(sessionStorage.getItem('loginuser'));
    if(user && user.uid){
      this.httprequest.searchCases(query, datas=>this.searchCallback(datas), user.uid);
    }
    else {
      this.httprequest.searchCases(query, datas=>this.searchCallback(datas));
    }
    
  }

  searchCallback(datas){
    this.caseslist = [];
      if(datas.status === 1){
        var cases = datas.result;
        console.log(cases);
        for(var c of cases){
          this.caseslist.push({
            id: c.cid,
            name: c.cname,
            customer: c.customer,
            pval: c.pval.replace(/<ul>/g,"").replace(/<li>/g,"").replace(/<\/ul>/g,"").replace(/<\/li>/g,""),
            imgpath: this.resourceBasePath + c.imgpath,
            indfields:c.indfields,
            techfields: c.techfields,
            bookmarked: c.bookmarked,
            isShow: true
          });
        }
        if(this.caseslist.length === 0){
          this.caseslist.push({
            id: -1,
            name: "",
            customer: "",
            pval: "",
            imgpath: "",
            indfields:[],
            techfields: [],
            bookmarked: false,
            isShow: false        
          });
        }
      }
  }

  togglerelevantdomain(): void {
    this.setCaseVisibleByShowLevel(this.getShowLevel(this.displayrelevantdomain, this.displayotherdomain));
  }

  toggleotherdomain(): void {
    this.setCaseVisibleByShowLevel(this.getShowLevel(this.displayrelevantdomain, this.displayotherdomain));
  }

  setCaseVisibleByShowLevel(level: number){
    switch(level){
      case 1:
        for(var c of this.caseslist){
          c.isShow = false;
          for(var ind of c.indfields){
            this.inputIndustries.forEach(item=>{
              if(ind.name === item["tag"]){
                c.isShow = true;
              }
            });
          }
        }
        break;
      case 2:
        for(var c of this.caseslist){
          c.isShow = true;
          for(var ind of c.indfields){
            this.inputIndustries.forEach(item=>{
              if(ind.name === item["tag"]){
                c.isShow = false;
              }
            });
          }
        }
        break;
      case 3:
        for(var c of this.caseslist){
          c.isShow = true;
        }
        break;
      default:
        for(var c of this.caseslist){
          c.isShow = false;
        }
    } 
  }

  /**
   * 3- show all, 2- only show other domain, 1-only show relevant domain, 0- no show
   * @param displayrelevantdomain 
   * @param displayotherdomain 
   */
  getShowLevel(displayrelevantdomain, displayotherdomain):number{
    if(displayrelevantdomain && displayotherdomain){
      return 3;
    }
    else if(displayrelevantdomain && !displayotherdomain){
      return 1;
    }
    else if(!displayrelevantdomain && displayotherdomain){
      return 2;
    }
    else {
      return 0;
    }
  }

  changeOptions(option:number):void {
    this.showoptions = option;
  }
}
