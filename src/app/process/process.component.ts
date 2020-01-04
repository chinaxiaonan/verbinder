import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {


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

  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}
