import { Component } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
      private router: Router,
      private route: ActivatedRoute,
      private windRefService: WindRefService
){}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.document = this.documentService.getDocument(id);
  });
  this.nativeWindow = this.windRefService.getNativeWindow();
}

onView(): void {
  this.nativeWindow.open(this.document.url);
}
}
