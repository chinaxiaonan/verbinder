import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { HttprequestService } from '../httprequest.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {
  @ViewChild('topdiv', {static:false}) topdiv: ElementRef;
  bsModalRef: BsModalRef;
  curUser={
    uid: '',
    username:''
  };
  constructor(private router: Router, private bsModalService:BsModalService, private httpRequest:HttprequestService) { }

  ngOnInit() {
    var struser = sessionStorage.getItem('loginuser');
    this.curUser = JSON.parse(struser);
    console.log(this.curUser);
    if(this.curUser){
      this.loadBookMarks(this.curUser.uid);
    }
  }

  changeBg(isHome:boolean){
    if(isHome){
      this.topdiv.nativeElement.classList.replace("bgcolor-2", "bgcolor-1");
    }
    else {
      this.topdiv.nativeElement.classList.replace("bgcolor-1", "bgcolor-2");
    }
  }

  toMain(): void {
    this.router.navigate([""]);
  }

  toSearch(): void {
    this.router.navigate(["search"]);
  }

  initlogin(): void {
    this.bsModalRef = this.bsModalService.show(LoginComponent, {
      class: 'modal-dialog-centered'
    });
  }

  logout(): void {
    sessionStorage.removeItem("loginuser");
    sessionStorage.removeItem("bookmarkfolders");
    window.location.reload();
  }

  loadBookMarks(uid){
    this.httpRequest.loadBookmarks(uid, result=>{
      if(result.status===1){
        sessionStorage.setItem('bookmarkfolders', JSON.stringify(result.folders));
      }
    });
  }

  toMyBookmarks():void{
    this.router.navigate(["bookmarklist"]);
  }

}
