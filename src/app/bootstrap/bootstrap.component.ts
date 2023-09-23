
import { Component, ViewChild } from '@angular/core';

import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent {
  pdfSrc: string = '';
  searchResults: string[] = [];

  loadingResults: boolean = false;

  excelDataResults: string[] = [];
  commonMatches: string[] = [];
  
  showResults : boolean = false;

  errorMessage : string = '';

  async onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const pdfData = await this.loadPdfData(selectedFile);

      if (pdfData) {
        this.pdfSrc = pdfData;
      } else {
        console.log('Failed to load PDF file.');
      }
    }
  }

  async onFileExcelUpload(event: any) {
   
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
  
        // Преобразуване на двумерния масив в масив от стрингове
        const flatExcelData = excelData.flat().map(value => String(value));
  
        console.log(flatExcelData);

        // this.searchText = flatExcelData;

        if (flatExcelData.length > 0) {
          this.excelDataResults = flatExcelData;
        }
      };
      fileReader.readAsBinaryString(selectedFile);
    } else {
      console.log('Failed to load Excel file.');
    }
  }
  
  // Метод за зареждане на PDF файл
  async loadPdfData(file: File): Promise<string | null> {

    const reader = new FileReader();
    return new Promise<string | null>((resolve, reject) => {
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  onCheckButtonClick(){
    this.search();
    this.showResults = true;
  }

  async search() {
    this.loadingResults = true;
  
    if (!this.pdfSrc) {
      // alert('Not loaded the file in PDF upload');
      this.loadingResults = false;
      this.errorMessage = 'Not loaded the file in PDF upload';
      return;
    }
    if (this.excelDataResults.length<=0) {
      alert('Not loaded the file in Excel upload');
      this.loadingResults = false;
      return;
    }
  
    const text = await this.extractTextFromPdf(this.pdfSrc);
    this.loadingResults = false;
  
    // Define your regex pattern
    const regex = /\b\d\s*\d\s*\d\s*[A-Z]\s*[A-Z]\s*\b/g;
  
    // Use a loop to extract and clean the matched strings
    const matchedStrings: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
  
      matchedStrings.push(match[0].replace(/\s/g, ''));
    }
    this.searchResults = matchedStrings.slice(1);
   
    const cleanedSearchResults = this.searchResults;
    const cleanedExcelDataResults = this.excelDataResults.map(str => str.replace(/\s/g, ''));
  
    // Find common matches
     this.commonMatches = cleanedSearchResults.filter(value => cleanedExcelDataResults.includes(value));
    console.log(cleanedSearchResults);
    console.log(cleanedExcelDataResults);
    console.log(this.commonMatches);
  
    if (this.commonMatches.length > 0) {
      const resultsMatrix = this.commonMatches.map(match => [match]);
      const ws = XLSX.utils.aoa_to_sheet(resultsMatrix);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Results');
      XLSX.writeFile(wb, 'Effective_Panels_Mach.xlsx');
    } else {
      console.log('No common matches found.');
      // alert('No common matches found...');
    }
   
  }
  
  // Метод за извличане на текст от PDF файл
  async extractTextFromPdf(pdfData: string): Promise<string> {
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const numPages = pdf.numPages;
    const textContent: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const pageText = await page.getTextContent();
      
      for (const item of pageText.items) {
        // console.log(item)
        if ('str' in item) {
          // console.log(item.str)
          textContent.push(item.str);
        }
      }
    }
    return textContent.join('\n');
  }

  onRefreshClick() {
   
    this.pdfSrc = '';
    this.searchResults = [];
    this.excelDataResults = [];
    this.commonMatches = [];
    this.showResults = false;
 
    const pdfFileInput = document.getElementById('pdf-file') as HTMLInputElement;
    const excelFileInput = document.getElementById('excel-file') as HTMLInputElement;
    if (pdfFileInput && excelFileInput) {
      pdfFileInput.value = '';
      excelFileInput.value = '';
    }
  }
}
