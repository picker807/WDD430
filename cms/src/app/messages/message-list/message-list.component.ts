import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService,
    private contactService: ContactService) {}


  onAddMessage(message: Message){
    this.messages.push(message)
  }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}
