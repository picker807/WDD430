import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  url: string = 'http://localhost:3000/messages';
  
  constructor(private http: HttpClient) { 
    
  }

  // Get all messages
  getMessages(): void {
    this.http.get<Message[]>(this.url).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a: Message, b: Message) => {
          if (a.subject <b.subject) {
            return -1;
          } else if (a.subject > b.subject) {
            return 1;
          } else {
            return 0;
          }
        });
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  storeMessages(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url, JSON.stringify(this.messages), { headers: headers })
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  getMessage(id: string): Message | null{
    for (const message of this.messages){
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message): void{
    if (!newMessage){
      return;
    }
    newMessage.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, messageData: Message }>(this.url,
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messageData);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error) => {
          console.error("Error at Message Service: ", error);
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
      this.messages.forEach(message => {
        const currentId = +message.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      return maxId;
  }
}
