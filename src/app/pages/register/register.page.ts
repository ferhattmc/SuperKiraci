import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../providers/services/api.service';
import { LoadingService } from 'src/providers/util/loading.service';
import { AlertService } from 'src/providers/util/alert.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})

export class RegisterPage implements OnInit {
  get email() {
    return this.registerForm.get('email');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(public api: ApiService, public rout: Router, public navCtrl: NavController, public loadingController: LoadingService, private formBuilder: FormBuilder, public alertService: AlertService) { }
  ngOnInit(): void {
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email adresi zorunlu alandır!' },
      { type: 'pattern', message: 'Lütfen email adresini girin' }
    ],
    firstName: [
      { type: 'required', message: 'Ad zorunlu alandır!' },
      { type: 'pattern', message: 'Lütfen adınızı giriniz.' }
    ],
    lastName: [
      { type: 'required', message: 'Soyad zorunlu alandır!' },
      { type: 'pattern', message: 'Lütfen soyadınızı giriniz.' }
    ],
    password: [
      { type: 'required', message: 'Şifre zorunlu alandır!' },
      { type: 'minLength', message: 'En az 6 karakter olmalı' }
    ]
  };

  async register() {

    try {
      let request: RegisterRequest = {
        email: this.registerForm.value.email,
        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.lastName,
        password: this.registerForm.value.password
      };
      this.api.register(request).subscribe(res => {
        console.log(res);
      }, err => { console.log(err) })

    } catch (error) {
      console.log(error);
    }
  }
  goLogin() {
    this.rout.navigate(['/login']);
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }
  goBack() {
    this.navCtrl.goBack();
  }

}
