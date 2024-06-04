import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service'; // Make sure the path is correct
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-viewer',
  template: `<img [src]="imageSrc" *ngIf="imageSrc" alt="Downloaded Image">`
})
export class PhotoViewerComponent implements OnInit {
  imageSrc?: SafeUrl; // Now optional to handle initialization

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Call loadImage with the filename you want to load initially
    this.loadImage('initial-image.jpg'); // Replace 'initial-image.jpg' with your actual file name
  }

  loadImage(fileName: string) {
    this.fileService.downloadFile(7).subscribe(data => {
      const objectURL = URL.createObjectURL(data);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }
}
