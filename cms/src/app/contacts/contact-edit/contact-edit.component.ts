import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
interface ContactWithId extends Contact { _id: string;}


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{

  originalContact: Contact;
  editMode: boolean = false;
  id: string;
  groupContacts: Contact[] = [];
  groupIds: string[] = [];
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        this.contact = {
          id: null,
          isAGroup: false,
          name: '', 
          email: '', 
          phone: '', 
          imageUrl: '', 
          group: []
        };
        return;
      }
      
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group && this.originalContact.group.length > 0) {
        this.groupContacts = [];
        this.groupIds = this.originalContact.group;
        this.originalContact.group.forEach(groupId => {
          const returnedContact = this.contactService.getContactWithObjectId(groupId);
            if (returnedContact) {
              this.groupContacts.push(returnedContact);
            }
          });
        }
    });
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer !== event.container) {
      const contactCopy = { ...event.item.data };
      const contactWithId = contactCopy as ContactWithId;
      const invalidGroupContact = this.isInvalidContact(contactWithId._id);
    if (invalidGroupContact){
        return;
    }
      this.groupContacts.push(contactCopy);
      this.groupIds.push(contactWithId._id);
    }
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newContact = new Contact("", value.isAGroup, value.name, value.email, value.phone, value.imageUrl, this.groupIds);

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  isInvalidContact(newId: string) {
    if (!newId) {
      return true;
    }
    const contactWithId = this.contact as ContactWithId;
    if (this.contact && newId === contactWithId._id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){

      const contact = this.groupContacts[i] as ContactWithId;
       if (newId === contact._id) {
         return true;
      }
    }
    return false;
 }
}
