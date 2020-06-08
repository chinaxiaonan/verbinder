import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {
  @ViewChild('topdiv', {static:false}) topdiv: ElementRef;
  bsModalRef: BsModalRef;
  curUser={
    username:'',
    userpwd:''
  };
  constructor(private router: Router, private bsModalService:BsModalService) { }

  ngOnInit() {
    this.curUser.username = sessionStorage.getItem('username');
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

  initlogin(): void {
    this.bsModalRef = this.bsModalService.show(LoginComponent, {
      class: 'modal-dialog-centered'
    });
  }

  logout(): void {
    sessionStorage.removeItem("username");
    window.location.reload();
  }

}
