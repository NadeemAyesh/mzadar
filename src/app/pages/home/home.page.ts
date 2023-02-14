import {Component, NgIterable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {GeneralService} from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public segment: string = "home";
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
  categories: any;
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
    updated_at: '',
    image: ''
  }[] = [];

  searchObj = {
    search: '',
    name: ''
  }

  appMobile: string = '';

  hasItems: boolean = true;
  ShowLink: boolean = false;
  user: any;

  constructor(private general: GeneralService, public loadingController: LoadingController, private alertController: AlertController, private auth: AuthService, private router: Router) {
    this.auth.$userUpdated.subscribe((data: any) => {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    })
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ngOnInit() {
    this.general.checkAuctionLink().subscribe((data: any) => {
      // console.log(data)
      if (data.code == 1) {
        this.ShowLink = true;
      } else {
        this.ShowLink = false;
      }
    });
    this.general.getSettings().subscribe((data: any) => {
      if (data.code == 1) {
        const settings = JSON.stringify(data.data);
        localStorage.setItem('settings', settings);
        this.appMobile = JSON.parse(localStorage.getItem('settings') as string)[0].mobile;
      }
    })

    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.getAuctions();
    this.getFishCategories();
    this.auth.getProfile().subscribe((data: any) => {
      if (data.code == 1) {
        // console.clear();
      }
    });
  }

  getSettings() {
    this.general.getSettings().subscribe((data: any) => {
      if (data.code == 1) {
        const settings = JSON.stringify(data.data);
        localStorage.setItem('settings', settings)
      }
    })
  }

  getUserType() {
    return JSON.parse(localStorage.getItem('user') as string).type
  }

  ionViewWillEnter() {
    this.fishes = [];
    this.general.checkAuctionLink().subscribe((data: any) => {
      // console.log(data)
      if (data.code == 1) {
        this.ShowLink = true;
      } else {
        this.ShowLink = false;
      }
    })
    this.getAuctions();
    this.getFishCategories();
    this.auth.getProfile().subscribe((data: any) => {
      if (data.code == 1) {
        console.clear();
        // console.log(data);
      }
    });
    this.getSettings();
  }

  handleRefresh(event: any) {
    this.fishes = [];
    this.general.checkAuctionLink().subscribe((data: any) => {
      // console.log(data)
      if (data.code == 1) {
        this.ShowLink = true;
      } else {
        this.ShowLink = false;
      }
    })
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getAuctions();
      this.getFishCategories();
      this.auth.getProfile().subscribe((data: any) => {
        if (data.code == 1) {
          console.clear();
          // console.log(data);
        }
      });
    }, 2000);
  };

  async getAuctions() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getAuctions().subscribe((data: any) => {
      if (data.code == 1) {
        this.auctions = data.data;
        this.hasItems = false;
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

  async getFishCategories() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getFishCategories().subscribe(async (data: any) => {
      if (data.code == 1) {
        this.categories = data.data
        for (let item of this.categories) {
          this.getFish(item.id);
        }
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

  async getFish(id: number) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.general.getFish(id).subscribe(async (data: any) => {
      if (data.code == 1) {
        // this.categories = data.data
        for (let item of data.data) {
          this.fishes.push(item);
        }
        this.hasItems = false;
      } else {

      }
      loading.dismiss();
    }, err => {
      loading.dismiss();

    })
  }

  async search() {
    /* const loading = await this.loadingController.create();
    await loading.present();

    const alert = await this.alertController.create({
      header: 'حدث خطأ!',
      subHeader: 'يرجى مراجعة البيانات المدخلة، ومن ثم حاول مجدداً.',
      buttons: ['تم'],
    });
    this.general.search(this.searchObj.name, this.searchObj.search).subscribe((data: any) => {
      if(data.code == 1) {
        localStorage.setItem('search', JSON.stringify(data.data.data));
      } else {
        alert.present();
      }
      loading.dismiss();
    }, err => {
      alert.present();
      loading.dismiss();
    }) */
  }

  async goToLogin() {

    const alert = await this.alertController.create({
      header: 'تسجيل الدخول',
      subHeader: 'يجب عليك تسجيل الدخول لتتمكن من عرض بياناتك الشخصية واضافة عروض ومزادات لحسابك.',
      buttons: [
        {
          text: 'تسجيل الدخول',
          handler: async () => {
            const loading = await this.loadingController.create();
            await loading.present();

            localStorage.clear();
            this.router.navigate(['/auth/login']);
            loading.dismiss();
          }
        },
        {
          text: 'إلغاء',
          role: 'cancel'
        }
      ],
    });

    alert.present();
  }

}
