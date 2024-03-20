import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() public contact: Contact | undefined;
  groupContacts: Contact[] = [];
  

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.contact = this.contactService.getContact(id)
        if (this.contact?.isAGroup && this.contact.group) {
            this.fetchGroupContacts();
          }
      };
      });
    }
    

  fetchGroupContacts(): void {
    this.groupContacts = [];
    this.contact.group.forEach(id => {
    const contactWithId = this.contactService.getContactWithObjectId(id);
    if (contactWithId) {
      this.groupContacts.push(contactWithId);
    }
    });
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}
