import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  array = [1]
  limit: number=0;
  addRow(){

    if(this.limit<2){

      this.array.push(1);
      this.limit++;

      if(this.limit==2){
        document.getElementById('fabBtn').style.display="none";
      }
      

    }

    console.log("yes");
  }

}
