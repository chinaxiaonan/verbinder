import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttprequestService } from '../httprequest.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
  industryId : number;
  cases : any;
  industry;

  resourceBasePath = "./assets/prod/";

  constructor(private activatedRoute:ActivatedRoute, private httpRequest:HttprequestService) { 
    this.industry = {
      id:-1,
      namekey:"",
      img: "",
      desctext:""
    }
  }

  ngOnInit() {
    this.industryId = this.activatedRoute.snapshot.queryParams['id'];
    console.log(this.industryId);
    this.loadIndustryById(this.industryId);
  }

  loadIndustryById(id){
    this.httpRequest.loadIndustry(id, datas=>{
      var results = datas['result'];
      if(results&&results.length>=1){
        this.industry = {
          id: results[0].id,
          namekey: results[0].namekey,
          img: this.resourceBasePath + results[0].imagepath,
          desctext: results[0].desctext
        };    
      }

    });
    this.cases = [
      {id:1, name:'123',img:this.resourceBasePath+'caseholder.png', cust:"华润电力"},
      {id:2, name:'234',img:this.resourceBasePath+'caseholder.png', cust:"华润电力"},
      {id:3, name:'345',img:this.resourceBasePath+'caseholder.png', cust:"华润电力"},
      {id:4, name:'456',img:this.resourceBasePath+'caseholder.png', cust:"华润电力"}
    ];
  }

}
