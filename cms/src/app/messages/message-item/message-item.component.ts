import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
@Input() message: Message;
messageSender: string;
contact: Contact;

constructor(private contactService: ContactService) {}

 ngOnInit(): void {
    
    this.contact = this.contactService.getContactWithObjectId(this.message.sender);
    this.messageSender = this.contact.name;
  }
}
    
  

