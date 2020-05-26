import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../../providers/services/api.service';
import { LoadingService } from 'src/providers/util/loading.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/providers/util/alert.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  passwordType = 'password';
  passwordIcon = 'eye-off';
  isLogin: string;
  constructor(public storage: Storage, public api: ApiService, public navCtrl: NavController, public rout: Router, public loadingService: LoadingService, private formBuilder: FormBuilder, public alertService: AlertService) {
    this.storage.get("isLogin").then((val: any) => {
      this.isLogin = val;
    });

  }
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email adresi zorunlu alandır!' },
      { type: 'pattern', message: 'Lütfen email adresini girin' }
    ],
    password: [
      { type: 'required', message: 'Şifre zorunlu alandır!' },
      { type: 'minLength', message: 'En az 6 karakter olmalı' }
    ]
  };
  async login() {

    try {
      this.loadingService.showLoader(true);
      let request: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.api.login(request).subscribe(res => {
        this.loadingService.showLoader(false);
        if (res.code === "basarili") {
          this.storage.set('isLogin', "true");
          this.storage.set('user', res.data);
          this.navCtrl.navigateForward('')
          //this.rout.navigateByUrl('home');
          this.alertService.presentAlert("Başarılı", "Hoşgeldiniz " + res.first_name + " " + res.last_name)
        }
        else if (res.code === "hatali") {
          this.storage.set('isLogin', "false");
          this.alertService.presentAlert("Başarısız", "Lütfen Email ve Parolanızı kontrol edip tekrar deneyin!.")
        }
      }, err => {
        console.log(err);
        this.loadingService.showLoader(false);
      })
      // const res = await this.afs.auth.signInWithEmailAndPassword(username, password);
      // console.log(res);
      setTimeout(() => {
        //this.rout.navigateByUrl('s');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  async loginGmail() {
    try {
      // const res = await this.afs.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // console.log(res);
      this.rout.navigateByUrl('home');
    } catch (error) {
      console.log(error);
    }
  }

  goRegister() {
    this.rout.navigateByUrl('/register');
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
    this.rout.navigate(['/'])
    //this.rout.navigateByUrl('/');
  }
  goBack() {
    this.navCtrl.goBack();
  }
}
