import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {
  baseUrl:string;
  constructor(private httpClient: HttpClient) {
    //this.baseUrl = 'http://'+environment.backend_api_node+":"+environment.backend_api_port;
    this.baseUrl = "";
   }

   loadIndustry(id:number, succ):void {
     var reqUrl = this.baseUrl+"api/industry/"+id;
     this.httpClient.get(reqUrl).subscribe(succ);
   }

  loadAllIndustries(inmain, succ):void {
    var reqUrl = this.baseUrl+"/api/industry/list";
    if(inmain){
      reqUrl = reqUrl+"/main";
    }
    this.httpClient.get(reqUrl).subscribe(succ);
  }

  loadMainTechnologies(succ):void {
    var reqUrl = this.baseUrl+"/api/technology/list/main";
    this.httpClient.get(reqUrl).subscribe(succ);
  }

  loadAllTechnologies(succ):void {
    var reqUrl = this.baseUrl+"/api/technology/list";
    this.httpClient.get(reqUrl).subscribe(succ);
  }

  createUser(user, succ): void{
    var reqUrl = this.baseUrl + "/api/user/create";
    this.httpClient.post(reqUrl, user).subscribe(succ);
  }

  login(user, succ, err): void{
    var reqUrl = this.baseUrl + "/api/user/login";
    this.httpClient.post(reqUrl, user).subscribe(succ, err);
  }
}
