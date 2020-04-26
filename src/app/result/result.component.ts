import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import {verbinderCharts} from '../charts/verbindercharts.model';
import {CommunicationService} from '../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']  
})
export class ResultComponent implements OnInit {
  project: any;
  flag:number;
  constructor(private http: HttpClient, private comm: CommunicationService, private route:Router) {
    
  }

  ngOnInit() {
    this.project = this.comm.getProj();
    if(this.project.industry=="制造业"){
      this.flag=1;
    }else if(this.project.industry=="火力发电"){
      this.flag=2;
    }else if(this.project.industry=="环境保护"){
      this.flag=3;
    }else if(this.project.industry=="空调系统"){
      this.flag=4;
    }else if(this.project.industry=="石油化工"){
      this.flag=5;
    }else{
      this.flag=6
    }
      
  }

  queryKG(){
    console.log("query knowledge graph data...");
/*      let project = {
      name:"es",industry:"Manufacture",requirement:"aa",deliverable:"bb",resources:['t1','t2'],technologies:['tt1','tt2','tt3']
    }
    project = {
      name:"tttt1",industry:"Manufacture",requirement:"aaaa",deliverable:"故障解决方案",resources:['领域设备列表'],technologies:['机器学习']
    }  */
    this.http.get('http://localhost:4500/api/getkgstruct?q='+JSON.stringify(this.project)).subscribe(data=> {
      console.log(data);
      this.comm.setDatas(data['result']);
      this.route.navigate(["kgraph"]);
    });
  }
}
