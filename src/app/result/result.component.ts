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
  constructor(private http: HttpClient, private comm: CommunicationService, private route:Router) {
    
  }


  ngOnInit() {

  }

  queryKG(){
    console.log("---------");
    //let project = this.comm.getObj();
    //console.log(project);
    let project = {
      name:"es",industry:"Manufacture",requirement:"aa",deliverable:"bb",resources:['t1','t2'],technologies:['tt1','tt2','tt3']
    }
    this.http.get('http://localhost:4500/api/getkgstruct?q='+JSON.stringify(project)).subscribe(data=> {
      console.log(data);
      this.comm.setDatas(data['result']);
      this.route.navigate(["kgraph"]);
    });
  }
}
