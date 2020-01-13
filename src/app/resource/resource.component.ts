import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from '../communication.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  selectedValues = null;
  showCard:boolean;
  showExplain:boolean;
  projectResources: Array<{value: string}> = [];
  boxColors:Array<boolean> = [];

  constructor(private httpClient: HttpClient, private comm: CommunicationService, private e:ElementRef) { }

  ngOnInit() {
    this.showCard = true;
    this.showExplain = true;
    console.log("inited..................");
    this.boxColors = [false, false, false,false,false,false,false,false, false,false,false,false,false, false];
  }

  search(value: string): void {
    this.httpClient.get('http://localhost:4500/api/resources?q='+value.trim()).subscribe(data => {
      const listOfOption: Array<{ label: string; value: string }> = [];
      data['result'].forEach(element => {
        listOfOption.push({ label: element.name, value: element.id });
      });
      this.listOfOption = listOfOption;
    });
  }

  clickExplain(){
    this.showExplain = !this.showExplain;
  }

  changeCard(){
    this.showCard = !this.showCard;
  }

  checkChange1($event){
    this.showCard = !this.showCard;
  }
  
  checkChange2($event){
    this.showCard = !this.showCard;
  }

}
