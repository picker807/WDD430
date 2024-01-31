import { Component, Output, EventEmitter } from '@angular/core';
import { Document} from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter();
  document1: Document = {id: "1", name: "Document 1", description: "The first document", url: "fake/url/doc1.txt"};
  document2: Document = {id: "2", name: "Document 2", description: "The second document", url: "fake/url/doc2.txt"};
  document3: Document = {id: "3", name: "Document 3", description: "The third document", url: "fake/url/doc3.txt"};
  document4: Document = {id: "4", name: "Document 4", description: "The fourth document", url: "fake/url/doc4.txt"};
  document5: Document = {id: "5", name: "Document 5", description: "The fifth document", url: "fake/url/doc5.txt"};
  documents: Document[] = [this.document1, this.document2, this.document3, this.document4, this.document5]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

} 
