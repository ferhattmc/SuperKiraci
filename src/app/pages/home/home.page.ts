
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  item: any;
  id: string;
  isLogin: string;
  slideOptions = {
    initialSlide: 1,
    speed: 500,
  };
  constructor(private router: Router, public storage: Storage, public menuCtrl: MenuController) {
    this.storage.get("isLogin").then((val: any) => {
      this.isLogin = val;
      if (val === "true")
        this.menuCtrl.enable(true, 'myMenu');
      else
        this.menuCtrl.enable(false, 'myMenu');
    });
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  ngOnInit() {
    this.logued();
  }

  gotoLogin() {
    this.router.navigateByUrl('/login');
  }

  logued() {
    // this.aut.authState
    //   .subscribe(
    //     user => {
    //       if (user) {
    //         console.log('loged');
    //         this.id = user.uid;
    //         console.log(this.id);
    //         this.getProfile(this.id);
    //       } else {
    //         this.router.navigateByUrl('/login');
    //       }
    //     },
    //     () => {
    //       // this.router.navigateByUrl('/login');
    //     }
    //   );
  }

  async signOut() {
    // const res = await this.aut.auth.signOut();
    // console.log(res);
    this.router.navigateByUrl('/login');
  }

  async getProfile(id) {
    // await this.services.getProfile(id).subscribe((data: any) => {
    //   if (data.length === 0) {
    //     console.log('profile empty');
    //     this.router.navigateByUrl(`edit-profile`);
    //   } else {
    //     console.log('Profile not empty');
    //     console.log(data);
    //     this.item = data;
    //   }
    // });
  }


  profile() {
    this.router.navigateByUrl(`profile`);
  }
}
