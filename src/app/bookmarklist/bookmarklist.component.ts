import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { IShareEvent } from '../shareinterface';

@Component({
  selector: 'app-bookmarklist',
  templateUrl: './bookmarklist.component.html',

  styleUrls: ['./bookmarklist.component.css']
})
export class BookmarklistComponent implements OnInit, IShareEvent {
  resourceBasePath = "./assets/prod/";
  folders;
  curUser;
  caseholderimg;
  bsBookmarkPanel:BsModalRef;
  constructor(private httpRequest:HttprequestService, private router: Router, 
    private bsModalService: BsModalService) { 
    this.folders = [];
    this.caseholderimg = this.resourceBasePath + "defaultcase.png";
  }

  ngOnInit() {
    this.loadAllbookmarksFolderByUid();
  }

  toBookmarkFolder($event, folder): void {
    console.log("in toBookmarkFolder .... ");
    this.router.navigate(["bookmarkfolder"], {queryParams:{id:folder.fid}});
  }

  loadAllbookmarksFolderByUid(): void{
    var struser = sessionStorage.getItem('loginuser');
    this.curUser = JSON.parse(struser);
    this.httpRequest.loadBookmarks(this.curUser.uid, datas=>{
      console.log(datas);
      if(datas.status === 1){
        console.log(datas);
        this.folders = datas.folders;
        for(let f of this.folders){
          for(let c of f.cases){
            c.cimg = this.resourceBasePath + c.cimg;
          }
        }
      }
    });
  }

  createnewfolder(): void {
    const initialState = {
      innewfolder: true,
      ineditfolder:false,
      callbackFunc: this
    }
    this.bsBookmarkPanel = this.bsModalService.show(BookmarkComponent, {
      class: 'modal-dialog-centered',
      initialState: initialState
    });
  }

  editfolder($event, folder):void{
    const initialState = {
      innewfolder: false,
      ineditfolder:true,
      editingfolder:folder,
      callbackFunc: this
    }
    this.bsBookmarkPanel = this.bsModalService.show(BookmarkComponent, {
      class: 'modal-dialog-centered',
      initialState: initialState
    });
    $event.stopPropagation();
  }

  triggerEvent(): void {
    this.loadAllbookmarksFolderByUid();
  }

}
