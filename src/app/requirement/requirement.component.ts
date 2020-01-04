import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {


  constructor(private http: HttpClient) { }


  ngOnInit() {
    // this.http.get("assets/benchmark_category.json").subscribe(e => {
    //   this.category=e;
    //   console.log(e);
    //   this.industrydata = this.category['Industry'];

    //   console.log("============");
    //   console.log(this.industrydata);

    //   this.selectedIndustry = "Environment";
    //   this.selectedSecond = "PM25";
    //   this.selectedThird = "Invensense";
    //   this.showlinkechart();
    // });
  }


}
