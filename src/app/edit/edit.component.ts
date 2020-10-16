import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { IdContactServiceService } from '@app/id-contact-service.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  contactId: any;
  name: any;
  phone: any;
  birthday: any;
  technologiesContact: any[];
  array: any[];
  fechaActual = Date.now();

  headers: any;
  mockUrl: any;
  contact: any[];
  technologies: any[];
  checks: any[] = [];

  formModify: FormGroup;

  constructor(private idContactService: IdContactServiceService, private http: HttpClient, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.contactId = this.idContactService.contactId;
    this.name = this.idContactService.name;
    this.phone = this.idContactService.phone;
    this.birthday = this.idContactService.birthday;
    this.technologiesContact = this.idContactService.technologies;
    this.getContact();
    this.getTechnologies();
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  getContact() {
    this.mockUrl = 'http://localhost:3000/contacts?id=' + this.contactId;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.get<any>(this.mockUrl).subscribe((datos) => {
      this.contact = datos;
    });
  }

  getTechnologies() {
    this.mockUrl = 'http://localhost:3000/technologies';
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.get<any>(this.mockUrl).subscribe((datos) => {
      this.technologies = datos;
      console.log(this.technologiesContact);
      console.log(this.technologies);
    });
  }

  modifyContact() {
    const checkboxes = (document.getElementsByName('check') as unknown) as HTMLElement;
    // Checkbox
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < document.getElementsByName('check').length; i++) {
      if (checkboxes[i].checked) {
        this.checks.push(checkboxes[i].value);
      }
    }
    this.name = this.formModify.get('name').value;
    this.phone = this.formModify.get('phone').value;
    this.birthday = this.formModify.get('birthday').value;

    this.mockUrl = 'http://localhost:3000/contacts?id=' + this.contactId;
    this.http
      .put<any>('http://localhost:3000/contacts/' + this.contactId, {
        name: this.name,
        phone: this.phone,
        birthday: this.birthday,
        technologies: this.checks,
      })
      .subscribe((datos) => {
        console.log(datos);
        this.router.navigate(['/home']);
      });
  }

  back() {
    this.router.navigate(['/home']);
  }

  private buildForm() {
    this.formModify = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      birthday: new FormControl('', [Validators.required]),
      technologie: new FormControl('', [Validators.required]),
    });
  }
}
