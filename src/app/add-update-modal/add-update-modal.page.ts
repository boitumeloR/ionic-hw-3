import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MainService, User } from '../services/main/main.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-add-update-modal',
  templateUrl: './add-update-modal.page.html',
  styleUrls: ['./add-update-modal.page.scss'],
})
export class AddUpdateModalPage implements OnInit {

  isUpdate = false;

  userForm: FormGroup;
  @Input() user: User;
  constructor(private fb: FormBuilder, private modal: ModalController,
              private service: MainService) { }

  ngOnInit() {
    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    console.log(this.user);
    this.isUpdate = this.user ? true : false;

    if (this.isUpdate) {
      this.userForm = this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        title: [this.user.title, Validators.required],
        emailAddress: [this.user.emailAddress, Validators.compose([Validators.required, Validators.email])],
        userRole: [this.user.userRole, Validators.required],
        password: ['', Validators.compose([Validators.minLength(6),  this.isUpdate ? Validators.nullValidator : Validators.required ])],
        confirmPassword: ['', this.isUpdate ? Validators.nullValidator : Validators.required]
      }, formOptions);
    } else {
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        title: ['', Validators.required],
        emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
        userRole: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6),  this.isUpdate ? Validators.nullValidator : Validators.required ])],
        confirmPassword: ['', this.isUpdate ? Validators.nullValidator : Validators.required]
      }, formOptions);
    }
  }

  dismissModal() {
    this.modal.dismiss();
  }

  async addUser() {
    const formCopy = this.userForm.value;
    delete formCopy.confirmPassword;
    formCopy.id = 0;

    const newUser: User = {
      ...formCopy
    };
    await this.service.addUser(newUser);
    this.modal.dismiss();
  }

  async updateUser() {
    const formCopy = this.userForm.value;
    delete formCopy.confirmPassword;

    const newUser: User = {
      ...formCopy,
      id: this.user.id,
      password: formCopy.password === '' ? this.user.password : formCopy.password
    };

    await this.service.updateUser(newUser);
    this.modal.dismiss();
  }
}
