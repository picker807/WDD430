import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface ContactWithId extends Contact { _id: string;}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  private contactsLoaded = new BehaviorSubject<boolean>(false);
  maxContactId: number;
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact []>();
  url: string = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) { 
  
  }

  // get all contacts
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
        this.contactsLoaded.next(true);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  areContactsLoaded(): Observable<boolean> {
    return this.contactsLoaded.asObservable();
  }

  sortAndSend(): void {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContactByName(name: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.name === name) {
        return contact;
      }
    }
    return null;
  }

  getContactWithObjectId(id: string): Contact | null {
    for (const contact of this.contacts) {
      const contactWithId = contact as ContactWithId;
      if (contactWithId._id === id) {
        return contactWithId;
      }
    }
    return null;
  }

  getObjectId(id: string): string | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        const contactWithId = contact as ContactWithId;
        return contactWithId._id;
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
      newContact.id = '';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.http.post<{ message: string, contact: Contact }>(this.url,
        newContact,
        { headers: headers })
        .subscribe(
          (responseData) => {
            console.log(responseData);
            this.contacts.push(responseData.contact);
            this.sortAndSend();
          },
          (error) => {
            console.error('Error adding contact', error);
          }
        );
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
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put(this.url + '/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        });
    }
  
    deleteContact(contact: Contact): void {
      if (contact === undefined || contact === null) {
        return;
      }
  
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
        return;
      }
      
      this.http.delete(this.url + '/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      )
      
    }
}
