import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[] = [];
maxDocumentId: number;
documentSelectedEvent = new EventEmitter<Document>();
documentListChangedEvent = new Subject<Document[]>();
url: string = 'https://cms-picker-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
  }

  // Get all documents
  getDocuments(): void {
    this.http.get<Document[]>(this.url).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a: Document, b: Document) => {
          if (a.name <b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  storeDocuments(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url, JSON.stringify(this.documents), { headers: headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string){
    for (const document of this.documents){
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

 getMaxId(): number {
  let maxId = 0;
    this.documents.forEach(document => {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
}

  addDocument(newDocument: Document): void {
    if (newDocument === undefined || newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (originalDocument === undefined || originalDocument === null || newDocument === undefined || newDocument === null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (document === undefined || document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

}
