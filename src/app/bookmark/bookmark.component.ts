import { Component, OnInit, ElementRef } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { IShareEvent } from '../shareinterface';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  resourceBasePath = "./assets/prod/";
  validateFolderForm: FormGroup;
  bookmarks = [];
  folderslist = [];
  caseid:number;
  innewfolder:boolean = false;
  ineditfolder:boolean = false;
  editingfolder;
  callbackFunc: IShareEvent;
  
  constructor(private httpRequest: HttprequestService, private fb: FormBuilder, private bsModalPanel:BsModalRef,
    private message: NzMessageService, private translate: TranslateService, private el:ElementRef) { 
    
  }

  ngOnInit() {
    this.validateFolderForm = this.fb.group({
      controlFoldername: [null, [Validators.required]],
      controlFolderdesc: ['']
    });
    //var folderstr = sessionStorage.getItem("bookmarkfolders");
    //if(folderstr){
    //  this.bookmarks = JSON.parse(folderstr);
    //  this.loadBookmarksDetail();
    //}
    if(this.ineditfolder && this.editingfolder){
      this.validateFolderForm.controls['controlFoldername'].setValue(this.editingfolder.fname);
      this.validateFolderForm.controls['controlFolderdesc'].setValue(this.editingfolder.fdesc);
    }
    this.loadCurUserBookmarks();
  }

  loadCurUserBookmarks(): void {
    var loginuser = JSON.parse(sessionStorage.getItem("loginuser"));
    if(loginuser){
      this.httpRequest.loadBookmarks(loginuser.uid, result=>{
        if(result.status === 1){
          this.folderslist = result.folders;
          console.log(this.folderslist);
        }
      });
    }
  }

  async loadBookmarksDetail(){
    var temp = [];
    for(let item of this.bookmarks){
      var result = await this.httpRequest.loadBookmarkFolder(item.f);
      if(result.status === 1){
        temp.push({
          fid: item.f,
          name: result.name,
          desctext: result.desctext,
          imgpath: this.resourceBasePath + result.imgpath,
          casenum: item.cases.length
        });
      }
    }
    this.folderslist = temp;
  }

  createnewfolder(): void{
    this.innewfolder = true;
  }

  submitCreate(): void{
    
    for(const i in this.validateFolderForm.controls){
      this.validateFolderForm.controls[i].markAsDirty();
      this.validateFolderForm.controls[i].updateValueAndValidity();
    }
    var loginuser = JSON.parse(sessionStorage.getItem("loginuser"));
    if(this.validateFolderForm.valid && loginuser){
      var folder = {
        uid: loginuser.uid,
        name: this.validateFolderForm.controls['controlFoldername'].value,
        desctext: this.validateFolderForm.controls['controlFolderdesc'].value
      }
      if(this.ineditfolder){
        folder['fid'] = this.editingfolder.fid;
      }
      this.httpRequest.createBookmarkFolder(folder, result=>{
        if(result.status === 1){
          this.bsModalPanel.hide();
          var messageKey = "ver.bookmark.updatefoldersucc";
          if(result.created){
            messageKey = "ver.bookmark.createfoldersucc";
          }
          this.translate.get(messageKey).subscribe(str=>{
            this.message.success(str);
            if(this.callbackFunc){
              this.callbackFunc.triggerEvent(3); // callback event 1=add bookmark succ, 2=remove bookmark succ, 3=create folder succ, 4=delete folder succ
            }
            
          });
          
        }
      });
    }
  }

  saveToFolder(folder):void {
    for(let f of this.folderslist){
      this.el.nativeElement.querySelector("#folderitem_"+f.fid).classList.remove("folder-selected");
    }
    this.el.nativeElement.querySelector("#folderitem_"+folder.fid).classList.add("folder-selected");
    this.httpRequest.addBookmark(0, folder.fid, this.caseid, result=>{
      if(result.status === 1){
        this.bsModalPanel.hide();
        this.translate.get("ver.bookmark.savebookmarksucc").subscribe(str=>{
          this.message.success(str);
          if(this.callbackFunc){
            this.callbackFunc.triggerEvent(1); // callback event 1=add bookmark succ, 2=remove bookmark succ, 3=create folder succ, 4=delete folder succ
          }

        });
        
      }
    });
  }

  deleteFolder():void {
    if(this.editingfolder){
      var folderObj = {
        fid: this.editingfolder.fid
      }
      this.httpRequest.deleteBookmarkFolder(folderObj, result=>{
        if(result.status === 1){
          this.bsModalPanel.hide();
          this.translate.get("ver.bookmark.deletebookmarksucc").subscribe(str=>{
            this.message.success(str);
            if(this.callbackFunc){
              this.callbackFunc.triggerEvent(4); // callback event 1=add bookmark succ, 2=remove bookmark succ, 3=create folder succ, 4=delete folder succ
            }
            
          });
        }
      });
    }
  }

}
