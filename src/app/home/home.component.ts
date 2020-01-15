import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommunicationService} from '../communication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requirement: string;
  reqPlan:string;
  expection:string;
  expectDelivery:string;
  step:number;  // 0: initial stage; 1: add deliverable stage; 2: add resource stage; 3: add technology stage
  btnstatus:boolean;
  project:any={};
  public nextAvi: boolean;
  listOfIndustry: Array<{ label: string; value: string }> = [];

  constructor(private httpClient: HttpClient, private msg: NzMessageService,private router: Router, private comm:CommunicationService){}
  
  redirect(){
    this.router.navigate(["result"]);
  }
  ngOnInit() {
    this.nextAvi = true;
    this.step = 0;
    this.btnstatus = false;
    this.searchIndustry("");
  }

  searchIndustry(value: string): void {
    this.httpClient.get('http://localhost:4500/api/industry?q='+value.trim()).subscribe(data => {
      const listOfIndustry: Array<{ label: string; value: string }> = [];
      data['result'].forEach(element => {
        listOfIndustry.push({ label: element.name, value: element.name });
      });
      this.listOfIndustry = listOfIndustry;
    });
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
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }


  r2next(){
    var obj = document.getElementById("backgroundPic");
    if(this.step < 3){
      this.step += 1;
    }
    if(this.step==1){
      obj.style.paddingBottom="15.5%";
    }
    if(this.step==2){
      obj.style.paddingBottom="5.5%";
    }
    if(this.step==3){
      this.comm.setProj(this.project);
      this.router.navigate(["result"]);
    }
    
    console.log(this.step);
  }
  
   //result page
 redirect2result(){
  this.router.navigate(["result"]);
 }

}
