import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TopheaderComponent } from './topheader/topheader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('topheader', {static:false}) topheader:TopheaderComponent;
  title = 'Verbinder';
  onactive($event):void {
    if($event instanceof HomeComponent){
      this.topheader.changeBg(true);
    }
    else {
      this.topheader.changeBg(false);
    }
  }
}
