import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact []>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null{
    for (const contact of this.contacts){
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  /*deleteContact(contact: Contact) { 
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.contactChangedEvent.emit(this.contacts.slice());
  }*/

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
  
      this.contactListChangedEvent.next(this.contacts.slice());
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
  
      this.contactListChangedEvent.next(this.contacts.slice());
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
      this.contactListChangedEvent.next(this.contacts.slice());
    }
}
