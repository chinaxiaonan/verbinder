import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from '../communication.service';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTechs: Array<{label: string; value: string}> = [];
  selectedValues = null;
  showCard:boolean;
  showExplain:boolean;
  showTechs: boolean;
  boxColors:Array<boolean> = [];
  selectresource:string;
  selecttechnologies:string;

  constructor(private httpClient: HttpClient, private comm: CommunicationService, private home:HomeComponent) { }

  ngOnInit() {
    this.showCard = true;
    this.showExplain = false;
    this.showTechs = true;
    console.log("inited..................");
    this.boxColors = [false, false, false,false,false,false,false,false, false,false,false,false,false, false];
    this.searchRes("");
    this.searchTechs("");
  }

  searchRes(value: string): void {
    this.httpClient.get('http://localhost:4500/api/resources?q='+value.trim()).subscribe(data => {
      const listOfOption: Array<{ label: string; value: string }> = [];
      data['result'].forEach(element => {
        listOfOption.push({ label: element.name, value: element.name });
      });
      this.listOfOption = listOfOption;
    });
  }

  searchTechs(value: string): void {
    this.httpClient.get('http://localhost:4500/api/technologies?q='+value.trim()).subscribe(data => {
      const listOfTechs: Array<{ label: string; value: string }> = [];
      data['result'].forEach(element => {
        listOfTechs.push({ label: element.name, value: element.name });
      });
      this.listOfTechs = listOfTechs;
    });
  }

  clickExplain(){
    this.showExplain = !this.showExplain;
  }

}
