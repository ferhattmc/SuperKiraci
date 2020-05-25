import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  email: string;
  first_name: string;
  last_name: string;
  password: string;
  cpassword: string;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(public api: ApiService, public rout: Router, public alertController: AlertController) { }



  async register() {

    const { email, first_name, last_name, password, cpassword } = this;

    if (password !== cpassword) {
      this.rout.navigate(['/register']);
    } else {
      try {
        let request: RegisterRequest = {
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password
        };
        this.api.register(request).subscribe(res => {
          console.log(res);
        }, err => { console.log(err) })

      } catch (error) {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          this.error('Incorrect Password');
        } if (error.code === 'auth/user-not-found') {
          this.error('User dont found');
        }
        if (error.code === 'auth/email-already-in-use') {
          this.error('User already use');
        }
        if (error.code === 'auth/argument-error') {
          this.error('Argument error');
        }
        if (error.code === 'auth/invalid-email') {
          this.error('Invalid email');
        }
      }
    }
  }
  goLogin() {
    this.rout.navigate(['/login']);
  }

  async errorpassIguales() {
    const alert = await this.alertController.create({
      message: 'The password dont macth',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorServ() {
    const alert = await this.alertController.create({
      message: 'Something went wrong try later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async error(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }

}
