import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  privacy: string = '';

  constructor(private general: GeneralService, private loadingController: LoadingController) { }

  ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('settings') as string);
    if(settings) {
      this.privacy = settings[0].privacy;
    }
  }

  async ionVeiwWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getSettings().subscribe((data: any) => {
      if (data.code == 1) {
        const settings = JSON.stringify(data.data);
        localStorage.setItem('settings', settings);
        this.privacy = data.data.privacy;
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
    })
  }

}
