import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../providers/services/api.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/providers/util/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/providers/util/alert.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {
  get email() {
    return this.generateCodeForm.get('email');
  }
  get generatedCode() {
    return this.lostPasswordForm.get('generatedCode');
  }
  get password() {
    return this.lostPasswordForm.get('password');
  }
  generateCodeForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
  });
  lostPasswordForm = this.formBuilder.group({
    generatedCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor(public api: ApiService, public navCtrl: NavController, public loadingController: LoadingService, private formBuilder: FormBuilder, public alertService: AlertService) {

  }
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email adresi giriniz' },
      { type: 'pattern', message: 'Lütfen email adresini girin' }
    ],
    generatedCode: [
      { type: 'required', message: 'Gönderilen kodu girmek zorunludur' },
      { type: 'pattern', message: 'Lütfen kodu doğru girdiğinizden emin olun' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'En az 6 karakter olmalı' }
    ]
  };
  ngOnInit() {
  }
  async generateCode() {
    this.loadingController.showLoader(true);
    let request: GenerateCodeRequest = {
      email: this.generateCodeForm.value.email
    };
    this.api.generateCode(request).subscribe(res => {
      this.alertService.presentAlert("Uyarı", res.message)
      this.loadingController.showLoader(false);
    }, err => { console.log(err) })
  }
  generatePassword() {
    if (!this.generateCodeForm.valid) {
      this.alertService.presentAlert("Uyarı", "Lütfen kodunu girdiğiniz e-mail adresini giriniz!")
    }
    else {
      this.loadingController.showLoader(true);
      let request: GeneratePasswordRequest = {
        email: this.generateCodeForm.value.email,
        sifre_yenileme_kodu: this.lostPasswordForm.value.generatedCode,
        yenisifre: this.lostPasswordForm.value.password
      };
      this.api.generatePassword(request).subscribe(res => {
        if (res.code === "basarili") {
          this.alertService.presentAlertConfirm("Başarılı!", res.message);
        }
        else if (res.code === "hatali") {
          this.alertService.presentAlert("Uyarı", res.message)
        }

        this.loadingController.showLoader(false);
      }, err => { console.log(err) })
    }
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
