import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lufthansa_search_pdf';
  src: string = 'assets/All_Figures.pdf';

  ngOnInit(): void {
    // initFlowbite();
  }
}
