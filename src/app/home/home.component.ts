import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { QuoteService } from './quote.service';
import { HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { IdContactServiceService } from '../id-contact-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  headers: any;
  mockUrl: any;
  contactos: any;

  constructor(private http: HttpClient, private router: Router, private idContactService: IdContactServiceService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.mockUrl = 'http://localhost:3000/contacts';
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.get<any>(this.mockUrl).subscribe((datos) => {
      this.contactos = datos;
    });
  }

  edit(contact: any) {
    this.idContactService.contactId = contact.id;
    this.idContactService.name = contact.name;
    this.idContactService.phone = contact.phone;
    this.idContactService.birthday = contact.birthday;
    this.idContactService.technologies = contact.technologies;
    this.router.navigate(['/edit']);
  }
}
