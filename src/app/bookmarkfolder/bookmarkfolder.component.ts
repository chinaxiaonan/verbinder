import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { IShareEvent } from '../shareinterface';

@Component({
  selector: 'app-bookmarkfolder',
  templateUrl: './bookmarkfolder.component.html',
  styleUrls: ['./bookmarkfolder.component.css']
})
export class BookmarkfolderComponent implements OnInit,IShareEvent {
  resourceBasePath = "./assets/prod/";
  username;
  bsBookmarkPanel:BsModalRef;
  bookmarkfolder = {
    fid: -1,
    fname: '',
    fdesc: '',
    fimg:''
  };

  cases = [];

  constructor(private httpRequest : HttprequestService, private activatedRoute :ActivatedRoute,
    private router:Router, private bsModalService: BsModalService) { }

  ngOnInit() {
    this.loadBookmarkFolderById();
    var struser = sessionStorage.getItem('loginuser');
    this.username = JSON.parse(struser).username;
  }

  loadBookmarkFolderById(){
    var folderId = this.activatedRoute.snapshot.queryParams['id'];
    if(folderId){
      this.httpRequest.loadBookmarkFolder(folderId).then(data=>{
        console.log(data);
        if(data.status === 1){
          this.bookmarkfolder = {
            fid: folderId,
            fname: data.name,
            fdesc: data.desctext,
            fimg: this.resourceBasePath + data.imgpath
          }
          this.cases = data.cases;
          for(let c of this.cases){
            c.imgpath = this.resourceBasePath + c.imgpath;
            c.pvalue = c.pvalue.replace(/<ul>/g,"").replace(/<li>/g,"").replace(/<\/ul>/g,"").replace(/<\/li>/g,"");
          }
        }
      });
    }
  }

  editfolder(): void {
    const initialState = {
      innewfolder: false,
      ineditfolder:true,
      editingfolder:this.bookmarkfolder,
      callbackFunc: this
    }
    this.bsBookmarkPanel = this.bsModalService.show(BookmarkComponent, {
      class: 'modal-dialog-centered',
      initialState: initialState
    });
  }

  triggerEvent():void {
    this.loadBookmarkFolderById();
  }

  toCaseDetail(caseitem):void {
    this.router.navigate(["case"],{queryParams:{id:caseitem.id}});
  }

  confirmRemove(item): void {
    this.httpRequest.removeBookmark(0,this.bookmarkfolder.fid, item.id, datas=>{
      if(datas.status === 1){
        this.loadBookmarkFolderById();
      }
    });
  }

  handleClick($event): void {
    $event.stopPropagation();
  }

}
