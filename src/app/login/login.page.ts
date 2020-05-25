import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;


  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(public storage: Storage, public api: ApiService, public rout: Router, public alertController: AlertController) { }

  async login() {

    const { username, password } = this;
    console.log(username, password);
    try {
      this.api.login(username, password).subscribe(res => {
        console.log(res);
        this.storage.set('isLogin', true);
      }, err => { console.log(err) })
      this.storage.get('isLogin');
      // const res = await this.afs.auth.signInWithEmailAndPassword(username, password);
      // console.log(res);
      setTimeout(() => {
        //this.rout.navigateByUrl('s');
      }, 1000);
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
      } else {
        this.error('Something went wrong try later');
      }
    }
  }
  async loginGmail() {
    try {
      // const res = await this.afs.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // console.log(res);
      this.rout.navigateByUrl('home');
    } catch (error) {
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
        this.error('Invalid error');
      }
      console.log(error);
    }
  }

  goRegister() {
    this.rout.navigateByUrl('/register');
  }

  async error(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  lostPassword() {
    this.rout.navigateByUrl('lost-password');
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }
  gotoslides() {
    this.rout.navigateByUrl('/');
  }

}
