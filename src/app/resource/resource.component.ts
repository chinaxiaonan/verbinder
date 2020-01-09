import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  selectedValues = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
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

}
