import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
    constructor(public loadingController: LoadingController) {

    }

    loading: any
    async showLoader(flag: boolean) {
        if (flag) {
            const loading = await this.loadingController.create({
                message: 'Lütfen Bekleyin..',
                spinner: 'lines',
                translucent: true
            });
            await loading.present();
        }
        else {
            await this.loadingController.dismiss();
        }
    }
}