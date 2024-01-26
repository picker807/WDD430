import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

message1 = new Message(102, "Cover sheets on TPS reports", "Starting next week, all TPS reports will require an Eburnean cover sheet. This subtle shade of white with a touch of yellow symbolizes our commitment to clarity, purity, and excellence in our work. Let's 'Embrace the Eburnean Excellence' and make our TPS reports a beacon of our company's values.", "Boss Guy");
message2 = new Message(103, "Help needed", "Trapped in a revolving door at the mall with my shoelace caught! Send help... or a shoehorn. And maybe some dignity while you're at it.", "Bob");
message3 = new Message(104, "Thank You", "Thank you for rescuing my inflatable T-Rex from the tree. Your tree-climbing skills are as impressive as your ability not to question why I have an inflatable dinosaur.", "Alicia");
messages: Message[] = [this.message1, this.message2, this.message3];

onAddMessage(message: Message){
  this.messages.push(message)
}
}
