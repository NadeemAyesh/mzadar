import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mazadaty',
  templateUrl: './mazadaty.page.html',
  styleUrls: ['./mazadaty.page.scss'],
})
export class MazadatyPage implements OnInit {

  public auctions: {
    bid_price: 0,
    body: '',
    first_price: 0,
    id: 0,
    last_price: 0,
    name: '',
    count: 0,
    image: '',
    percentage: 0.6,
    most_price: 0
  }[] = [];

  constructor(private auth: AuthService, private loadingController: LoadingController) {
    this.getFishAuctions();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getFishAuctions();
    }, 2000);
  };

  ngOnInit() {
    this.getFishAuctions();
  }

  ionViewWillEnter() {
    this.getFishAuctions();
  }

  async getFishAuctions() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.auth.getFishAuctions().subscribe((data: any) => {
      if (data.code == 1) {
        this.auctions = data.data;
      }
      loading.dismiss();
    }, (err: any) => {
      loading.dismiss();
    });
  }

}
