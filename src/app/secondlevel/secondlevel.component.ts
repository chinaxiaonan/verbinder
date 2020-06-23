import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-secondlevel',
  templateUrl: './secondlevel.component.html',
  styleUrls: ['./secondlevel.component.css']
})
export class SecondlevelComponent implements OnInit {
  resourceBasePath = "./assets/prod/";
  type: number; // 0:unknow, 1: industry, 2:technology
  targetObj;
  cases = [];
  constructor(private httpRequest: HttprequestService, private router: Router) {
    this.targetObj = {
      id: -1,
      name:'',
      desctext:'',
      img:''
    }
  }

  ngOnInit() {
    var url = this.router.url;
    if (url.indexOf('industry') !== -1) {
      this.type = 1;
      var id = url.substring(url.indexOf('id=')+3);
      this.loadIndustryById(id);
    }
    else if (url.indexOf('technology') !== -1) {
      this.type = 2;
      var id = url.substring(url.indexOf('id=')+3);
      this.loadTechnologyById(id);
    }
    else {
      this.type = 0;
    }
    console.log(this.type);

  }


  loadIndustryById(id) {
    this.httpRequest.loadIndustry(id, data => this.loadcallback(data));
  }

  loadTechnologyById(id) {
    this.httpRequest.loadTechnology(id, data=>this.loadcallback(data));
  }

  loadcallback(data): void {
    console.log(data);
    if(data.status === 1){
      this.targetObj = {
        id: data.id,
        name: data.name,
        img: this.resourceBasePath + data.imagepath,
        desctext: data.desctext
      }
      this.cases = data.cases;
      for(let c of this.cases){
        c.imgpath = this.resourceBasePath + c.imgpath;
        c.pvalue = c.pvalue.replace(/<ul>/g,"").replace(/<\/ul>/g,"").replace(/<\/li>/g,"").replace(/<li>/g,"");
      }
    }
    
  }

  toCaseDetail(item):void {
    this.router.navigate(["case"],{queryParams:{id:item.id}});
  }


}
