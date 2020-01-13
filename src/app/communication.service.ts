import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private project;
  private datas;
  setProj(o){
    this.project = o;
  }
  getProj(){
    return this.project;
  }

  setDatas(o){
    this.datas = o;
  }

  getDatas(){
    return this.datas;
  }
}
