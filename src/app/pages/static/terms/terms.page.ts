import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  terms: string = '';

  constructor(private general: GeneralService, private loadingController: LoadingController) { }

  ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('settings') as string);
    if(settings) {
      this.terms = settings[0].terms;
    }
  }

  async ionVeiwWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getSettings().subscribe((data: any) => {
      if (data.code == 1) {
        const settings = JSON.stringify(data.data);
        localStorage.setItem('settings', settings);
        this.terms = data.data.terms;
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
    })
  }

}
