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
     var reqUrl = this.baseUrl+"/api/industry/"+id;
     this.httpClient.get(reqUrl).subscribe(succ);
   }

   loadTechnology(id:number, succ):void {
    var reqUrl = this.baseUrl+"/api/technology/"+id;
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

  loadCase(cid:number, succ, uid?:number): void {
    var reqUrl = this.baseUrl+"/api/project/load?cid="+cid;
    if(uid){
      reqUrl = reqUrl + "&uid="+uid;
    }
    this.httpClient.get(reqUrl).subscribe(succ);
  }

  loadMainCases(succ): void {
    var reqUrl = this.baseUrl+"/api/project/list/main";
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

  loadBookmarks(uid, succ): void {
    var reqUrl = this.baseUrl + "/api/bookmarks/all?uid="+uid;
    this.httpClient.get(reqUrl).subscribe(succ);
  }

  loadBookmarkFolder(fid): Promise<any> {
    var reqUrl = this.baseUrl + "/api/bookmarks/folder/"+fid;
    return this.httpClient.get(reqUrl).toPromise();
  }

  createBookmarkFolder(folder, succ): void {
    var reqUrl = this.baseUrl + "/api/bookmarks/folder/create";
    this.httpClient.post(reqUrl, folder).subscribe(succ);
  }

  deleteBookmarkFolder(folder, succ): void {
    var reqUrl = this.baseUrl + "/api/bookmarks/folder/delete";
    this.httpClient.post(reqUrl, folder).subscribe(succ);
  }

  addBookmark(uid:number, fid:number, pid:number, succ): void {
    var reqUrl = this.baseUrl + "/api/bookmarks/addbookmark";
    var obj = {
      fid: fid,
      pid: pid
    }
    this.httpClient.post(reqUrl, obj).subscribe(succ);
  }
  removeBookmark(uid:number, fid:number, pid:number, succ): void {
    var reqUrl = this.baseUrl + "/api/bookmarks/removebookmark";
    var obj = {
      fid: fid,
      pid: pid
    }
    this.httpClient.post(reqUrl, obj).subscribe(succ);
  }

  searchCases(query, succ, uid?:number, page?:number, limit?:number): void {
    var reqUrl = this.baseUrl + "/api/project/search?q=" + JSON.stringify(query);
    if(uid){
      reqUrl = reqUrl + "&u=" + uid;
    }
    if(page){
      reqUrl = reqUrl + "&p=" + page;
    }
    if(limit){
      reqUrl = reqUrl + "&l=" + limit;
    }
    this.httpClient.get(reqUrl).subscribe(succ);
  }
}
