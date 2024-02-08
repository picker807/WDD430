import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  constructor(private messageService: MessageService) {}

  currentSender = "Aaron Picker";
  @ViewChild('subject') subjectInput: ElementRef;
  @ViewChild('msgText') msgTextInput: ElementRef;
  @Output() addMessageEvent: EventEmitter<Message> = new EventEmitter();

  onSendMessage(){
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.msgTextInput.nativeElement.value;
    let message = new Message("1", subject, msgText, "1")

    this.messageService.addMessage(message);
  }

  onClear(){
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
