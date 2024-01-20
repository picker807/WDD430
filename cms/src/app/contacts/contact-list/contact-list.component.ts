import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contact1: Contact = { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', imageUrl: 'assets/images/jacksonk.jpg', group: [] };
  contact2: Contact = { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', imageUrl: 'assets/images/barzeer.jpg', group: [] };
  contacts: Contact[] = [this.contact1, this.contact2];
}
