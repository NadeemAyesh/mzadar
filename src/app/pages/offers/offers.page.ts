import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public segment: string = "home";

  public fishes: {
    active: '',
    body: '',
    category_id: 0,
    created_at: '',
    deleted_at: '',
    id: 0,
    name: '',
    old_price: 0,
    price: 0,
    quantity: 0,
    updated_at:'',
    image: ''
  }[] = [];
  categories: any;

  constructor(private auth: AuthService, private loadingController: LoadingController, private general: GeneralService) {
    this.getFishCategories()
  }

  handleRefresh(event: any) {
    this.fishes = [];
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getFishCategories();
    }, 2000);
  };

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ngOnInit() {
    this.getFishCategories()
  }

  ionViewWillEnter() {
    this.getFishCategories()
  }

  async getFishProfile(catID: number) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.auth.getFishProfile(catID).subscribe((data: any) => {
      if(data.code == 1) {
        this.fishes = data.data
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

  async getFishCategories() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getFishCategories().subscribe(async (data: any) => {
      if (data.code == 1) {
        this.categories = data.data
        for (let item of this.categories) {
          this.getFishProfile(item.id);
        }
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

}
