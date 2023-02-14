import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchObj = {
    search: '',
    type: 'auction'
  }
  public segment: string = "auction";

  searchData: any;

  public searchArr: {
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

  loading: boolean = false;
  hasItems: boolean = false;

  appMobile: string = '';
  userImage: string = '';

  user: any;

  constructor(private general: GeneralService, public loadingController: LoadingController, private alertController: AlertController, private router: Router, private auth: AuthService) {
    this.auth.$userUpdated.subscribe((data: any) => {
      this.userImage = JSON.parse(localStorage.getItem('user') as string).image;
      this.user = JSON.parse(localStorage.getItem('user') as string);
    })
  }

  ngOnInit() {
    this.appMobile = JSON.parse(localStorage.getItem('settings') as string)[0].mobile;
    this.userImage = JSON.parse(localStorage.getItem('user') as string).image;
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  getUserType() {
    return JSON.parse(localStorage.getItem('user') as string).type
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    this.searchObj.type = this.segment;
    if(this.searchObj.search) {
      this.search();
    }
  }

  async search() {
    this.loading = true;
    const alert = await this.alertController.create({
      header: 'حدث خطأ!',
      subHeader: 'يرجى مراجعة البيانات المدخلة، ومن ثم حاول مجدداً.',
      buttons: ['تم'],
    });
    if(this.searchObj.search) {
      this.general.search(this.searchObj.type, this.searchObj.search).subscribe((data: any) => {
        if(data.code == 1) {
          if(this.segment == 'auction') {
            this.searchArr = data.data
          } else {
            this.fishes = data.data
          }
          this.hasItems = false;
          if(data.data.length <= 0) {
            this.hasItems = true;
          } else {
            this.hasItems = false
          }
        } else {
          alert.present();
          this.hasItems = true;
        }
        this.loading = false;
      }, (err: any) => {
        alert.present();
        this.loading = false;
        this.hasItems = true;
      })
    } else {
      this.searchArr = [];
      this.loading = false;
      this.hasItems = false;
    }

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
