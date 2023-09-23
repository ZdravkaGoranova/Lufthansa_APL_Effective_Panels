import { Component, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;


  pdfSrc: string = '';
  searchText: string = '';

  onFileSelected() {
    let $img: any = document.querySelector('#file');
    debugger
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
    console.log($img.files[0])
    console.log(this.pdfSrc)
  }
  search(searchText: string) {
    debugger
    console.log(this.pdfComponent)
    console.log(this.pdfSrc)
    this.pdfComponent.eventBus.dispatch('find', {
      query: searchText,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true
    });
  }


}
