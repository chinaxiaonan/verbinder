import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { BookmarkComponent } from '../bookmark/bookmark.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('selectedIndustryText', {static:false}) selectedIndustryText : ElementRef;
  @ViewChild('searchdiv', {static:false}) searchdiv : ElementRef;
  searchObj:any;
  selectedIndustry;
  inputReq:string;
  industrieslist = [];
  technologieslist = [];
  caseslist = [];
  inputTags: Set<string>;
  inputIndustries: Set<object>;
  showTagPanel = false;
  showBookmarkPanel = false;
  modifyingTag;
  tempStoredTag;
  bsModifyTagPanel:BsModalRef;

  constructor(private httprequest: HttprequestService, private render2: Renderer2, private bsModalService:BsModalService) { 
    this.inputTags = new Set<string>();
    this.inputIndustries = new Set<object>();
    this.selectedIndustry = {
      id: -1,
      tag: "ver.search.industryhint"
    }
    this.searchObj = {
      industry: '',
      requirements: []
    };
  }

  ngOnInit() {
    this.caseslist = [
      {id:1, name:"case 1", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:2, name:"case 2", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:3, name:"case 3", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:4, name:"case 4", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:5, name:"case 5", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:6, name:"case 6", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:7, name:"case 7", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:8, name:"case 8", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:9, name:"case 9", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"},
       {id:10, name:"case 10", customer:"华润", 
       technology: "空气质量预测", industry: "智慧城市",
       value:"能够随时掌握预测KPI并能模拟特定时间治理措施的影响，这将对空气污染治理产生巨大影响"}
    ];
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
    if(this.inputReq){
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
        this.industrieslist.push({id:result.id, tag:result.namekey});
      });
    });
  }

  loadAllTechnologies(): void {
    this.httprequest.loadAllTechnologies(datas=>{
      var results = datas['result'];
      var temp = [];
      results.forEach(result => {
        temp.push({id:result.id, name:result.namekey, selected:false});
      });
      this.technologieslist = temp;
    })
  }

  loadBookmarks(uid:number):void {

  }

  loadCasesData(pageIndex: number): void {
  }

  toggleBookmark(caseitem): void {
    console.log(caseitem.bookmarked);
    const initialState = {
      bookmarks: [{a:1}]
    };
    if(caseitem.bookmarked){
      //this.showBookmarkPanel = caseitem.bookmarked;
      this.bsModalService.show(BookmarkComponent, {
        class: 'modal-dialog-centered'
      });
    }
    
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



}
