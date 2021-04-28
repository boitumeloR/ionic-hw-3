import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddUpdateModalPage } from '../add-update-modal/add-update-modal.page';
import { MainService, User } from '../services/main/main.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  users: User[] = [];
  constructor(private menu: MenuController, private service: MainService,
              private modal: ModalController) {}

  async ngOnInit() {
    await this.service.init();
    await this.readUsers();
  }

  async readUsers() {
    this.users = await this.service.readUsers();
  }
  openDrawer(): void {
    this.menu.open('first');
  }

  async addUser() {
    const modal = this.modal.create({
      component: AddUpdateModalPage,
    });

    (await modal).onDidDismiss().then(() => {
      this.readUsers();
    });

    return (await modal).present()
  }

  async updateUser(user: User) {
    const modal = this.modal.create({
      component: AddUpdateModalPage,
      componentProps: {
        'user': user
      }
    });

    (await modal).onDidDismiss().then(() => {
      this.readUsers();
    });

    return (await modal).present()
  }

  async deleteUser(user: User) {
    await this.service.deleteUser(user);
    this.readUsers();
  }
}
