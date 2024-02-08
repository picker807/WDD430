import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  onSelected(event: Event, contact: Contact){
    
    this.contactService.contactSelectedEvent.emit(contact);
    event.preventDefault();
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
} 
