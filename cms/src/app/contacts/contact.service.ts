import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact []>();
  url: string = 'https://cms-picker-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) { 
    //this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): void{
    this.http.get<Contact[]>(this.url).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a: Contact, b: Contact) => {
          if (a.name <b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

  }

  storeContacts(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url, JSON.stringify(this.contacts), { headers: headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact | null{
    for (const contact of this.contacts){
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
      this.contacts.forEach(contact => {
        const currentId = +contact.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      return maxId;
  }
  
    addContact(newContact: Contact): void {
      if (newContact === undefined || newContact === null) {
        return;
      }
  
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
  
      this.storeContacts();
    }
  
    updateContact(originalContact: Contact, newContact: Contact): void {
      if (originalContact === undefined || originalContact === null || newContact === undefined || newContact === null) {
        return;
      }
  
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      }
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
  
      this.storeContacts();
    }
  
    deleteContact(contact: Contact): void {
      if (contact === undefined || contact === null) {
        return;
      }
  
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
        return;
      }
  
      this.contacts.splice(pos, 1);
      this.storeContacts();
    }
}
