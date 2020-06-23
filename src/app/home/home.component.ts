
import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { CommunicationService } from '../communication.service';
import Swiper from 'swiper';
import { HttprequestService } from '../httprequest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sloganswiper: Swiper;
  swiper: Swiper;
  industrieslist = [];
  technologieslist = [];
  caseslist;
  requirement: string;
  plan: string;
  expection: string;
  expectDelivery: string;
  step: number;  // 0: initial stage; 1: add deliverable stage; 2: add resource stage; 3: add technology stage
  btnstatus: boolean;
  project: any = {};
  selectedCase={
    id: -1,
    name:"",
    desctext:"",
    indfields:[],//{id:-1,name:""},
    techfields:[],//{id:-1,name:""},
    shortvalue:""
  };
  public nextAvi: boolean;
  listOfIndustry: Array<{ label: string; value: string }> = [];
  resourceBasePath = "./assets/prod/";

  constructor(private httprequest: HttprequestService, private msg: NzMessageService, private router: Router,
    private comm: CommunicationService, private translate: TranslateService, private el: ElementRef) { }

  redirect() {
    this.router.navigate(["result"]);
  }

  toSearch(): void {
    this.router.navigate(["search"]);
  }
  toIndustry(id):void {
    this.router.navigate(["industry"], {queryParams:{id:id}});
  }
  toTechnology(id):void {
    this.router.navigate(["technology"], {queryParams:{id:id}});
  }
  toCaseDetail():void {
    if(this.selectedCase.id>0){
      this.router.navigate(["case"],{queryParams:{id:this.selectedCase.id}});
    }
    
  }
  ngOnInit() {
    this.nextAvi = true;
    this.step = 0;
    this.btnstatus = false;
    this.loadIndustries();
    this.loadMainCases();
    
    
  }

  ngAfterViewInit() {
    
    
    this.swiper = new Swiper('.tech-container', {
      direction: 'horizontal',
      //loop: true,
      initialSlide: 0,
      observer:true,
      slidesPerView : 5,
      centeredSlides : true,
      spaceBetween: 90

    });

    this.loadMainTechnologies();
    
  }

  loadIndustries(): void {
    this.httprequest.loadAllIndustries(true, datas=>{
      var results = datas['result'];
      var tmp = [];
      results.forEach(result => {
        var hoverimg = this.resourceBasePath + result.iconpath.replace(".png", "-hover.png");
        var tag = result.iconpath.replace("icon-","").replace(".png", "");
        tmp.push({ id: result.id, name: result.name, img: this.resourceBasePath + result.iconpath, hoverimg: hoverimg, tag:tag});
      });
      this.industrieslist = tmp;
    });
  }

  loadMainTechnologies(): void {
    this.httprequest.loadMainTechnologies(datas=>{
      var results = datas['result'];
      results.forEach(result => {
        var hoverimg = this.resourceBasePath + result.iconpath.replace(".png", "-hover.png");
        var tag = result.iconpath.replace("icon-","").replace(".png", "");
        this.technologieslist.push({ id: result.id, name: result.name, desciption:result.desciption, img: this.resourceBasePath + result.iconpath, hoverimg: hoverimg, tag:tag});
        if(this.technologieslist.length >=3 ){
          this.swiper.slideTo(2);
        }
      });
    });
  }

  searchIndustry(value: string): void {
    /**this.httpClient.get('http://localhost:4500/api/industry?q=' + value.trim()).subscribe(data => {
      const listOfIndustry: Array<{ label: string; value: string }> = [];
      data['result'].forEach(element => {
        listOfIndustry.push({ label: element.name, value: element.name });
      });
      this.listOfIndustry = listOfIndustry;
    });**/
  }

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['txt'].indexOf(w.type));

        // if (filterFiles.length !== fileList.length) {
        //   this.msg.error(`包含文件格式不正确，只支持 png 格式`);
        //   return filterFiles;
        // }
        return fileList;
      }
    },
    {
      name: 'async',
      fn: (fileList: UploadFile[]) => {
        return new Observable((observer: Observer<UploadFile[]>) => {
          // doing
          observer.next(fileList);
          observer.complete();
        });
      }
    }
  ];

  fileList = [
    {
      // uid: -1,
      // name: 'test.txt',
      // status: 'done',
      // url:""
    }
  ];

  // tslint:disable-next-line:no-any
  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    // tslint:disable-next-line:no-any
    this.fileList = fileList.filter((item: any) => {
      this.project.requirement = "我们可否研发一套智能化系统，从历史案例库中挖掘知识脉络，行程自动化的案例检索、原因分析与方案推荐，从而吸住相关人员进行故障诊断。根据专家经验及从案例数据中提取的领域知识建智能化分析模型，着重通过检索相似历史案例或匹配标准故障描述的方式推荐可能的故障原因及解决方案。";
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }


  r2next() {
    var obj = document.getElementById("backgroundPic");
    if (this.step < 3) {
      this.step += 1;
    }
    if (this.step == 1) {
      obj.style.paddingBottom = "15.5%";
    }
    if (this.step == 2) {
      obj.style.paddingBottom = "5.5%";
    }
    if (this.step == 3) {
      this.comm.setProj(this.project);
      this.router.navigate(["result"]);
    }

    console.log(this.step);
  }

  //result page
  redirect2result() {
    this.router.navigate(["result"]);
  }

  changemenuselect($event) {
    var index = $event.elementRef.nativeElement.id.substr('item_'.length);
    this.setMenuSelection(index);
  }

  setMenuSelection(index){
    this.resetMenuStyles();
    this.caseslist[index].selected = true;
    this.selectedCase = this.caseslist[index];
  }

  resetMenuStyles(): void {
    for (var i = 0; i < this.caseslist.length; i++) {
      this.caseslist[i].selected = false;
    }
  }

  onhover($event): void {
    for(let item of this.industrieslist){
      this.setIndustryStyle(item.tag, false);
    }
    var targetTag = $event.srcElement.id.replace('cad_','').replace('img_','').replace('lbl_','');
    this.setIndustryStyle(targetTag, true);
  }

  onleave($event): void {
    var targetTag = $event.srcElement.id.replace('cad_','');
    this.setIndustryStyle(targetTag, false);
  }

  setIndustryStyle(tag, selected){
    if(selected){
      var img = this.resourceBasePath + "icon-" + tag + "-hover.png";
      this.el.nativeElement.querySelector("#img_"+tag).src=img;
    }
    else {
      var img = this.resourceBasePath + "icon-" + tag + ".png";
      this.el.nativeElement.querySelector("#img_"+tag).src=img;
    }
    
  }

  loadMainCases():void{
    this.httprequest.loadMainCases(datas=>{
      if(datas.status===1){
        console.log(datas.result);
        this.caseslist = datas.result;
        for(var i=0; i<this.caseslist.length; i++){
          if(i===0){
            this.caseslist[i].selected = true;
          }
          else {
            this.caseslist[i].selected = false;
          }
          this.caseslist[i].shortname = this.caseslist[i].name.length>8?this.caseslist[i].name.substr(0,7)+"...":this.caseslist[i].name;
        }
        this.setMenuSelection(0);
      }
    });
  }
}
