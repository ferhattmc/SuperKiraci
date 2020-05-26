import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class AlertService {
    constructor(public alertController: AlertController) {

    }
    async presentAlertConfirm(title, message) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            message: message,
            buttons: [
                {
                    text: 'Tamam',
                    handler: () => {

                    }
                }
            ]
        });

        await alert.present();
    }
    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: header,
            message: message,
            buttons: ['Tamam']
        });

        await alert.present();
    }

}
