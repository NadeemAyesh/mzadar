import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import Swiper from 'swiper';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-single-fish',
  templateUrl: './single-fish.page.html',
  styleUrls: ['./single-fish.page.scss'],
})
export class SingleFishPage implements OnInit {
  id: string = '';
  fishItem: {
    active: string,
    body: string,
    category_id: number,
    created_at: string,
    deleted_at: string,
    id: number,
    name: string,
    old_price: number,
    price: number,
    quantity: number,
    updated_at: string,
    images: [],
    type: number,
    status: number
  } = {
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
    images: [],
    type: 0,
    status: 0,
  };

  slicingMethods: any;
  PackagingMethods: any;

  slicing: number = 0;
  packaging: number = 0;

  productImages: any = [];

  showIt: boolean = false;
  user: any;

  announcement = [
    {
      announcementDetails: "",
      showMore: false
    },
  ];

  constructor(private general: GeneralService, private loadingController: LoadingController, private route: ActivatedRoute, private alertController: AlertController) {
    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore: false
    }));
  }

  async ngOnInit() {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
    const loading = await this.loadingController.create();
    await loading.present();
    this.route.params.subscribe((params: any) => {
      this.id = params['id'] as string;
      this.general.getSingleFish(this.id).subscribe((data: any) => {
        if(data.code == 1) {
          this.fishItem = data.data;
          this.announcement[0].announcementDetails = this.fishItem.body;
          this.getSlicingMethods();
          this.getPackagingMethods();
          this.general.getFishImages(this.id).subscribe((data: any) => {
            // console.log(data);
            this.productImages = data.data;
          });

          this.checkMazad();
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    });
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  trimString(string: string, length: number) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  checkMazad() {
    this.general.checkFish(this.id).subscribe((data: any) => {
      if(data.code == 1) {
        this.showIt = true;
      } else {
        this.showIt = false;
      }
    })
  }

  getSlicingMethods() {
    this.general.getSlicingMethods(this.fishItem.id).subscribe((data: any) => {
      if (data.code == 1) {
        this.slicingMethods = data.data;
      }
    })
  }

  getPackagingMethods() {
    this.general.getPackagingMethods(this.fishItem.id).subscribe((data: any) => {
      if (data.code == 1) {
        this.PackagingMethods = data.data;
      }
    })
  }

  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }

  alertSuccss = this.alertController.create({
    header: 'تهانينا',
    message: 'سوف يتم التواصل معك خلال دقيقتين لتسليم الطلب',
    buttons: [
      {
        text: 'يلا بانتظاركم',
        role: 'confirm',
        handler: () => {
          const appMobile = JSON.parse(localStorage.getItem('settings') as string)[0].mobile;
          window.open('whatsapp://send?phone=' + appMobile);
        },
        cssClass: 'btn-primary'
      },
    ]
  });

  alertSold = this.alertController.create({
    header: 'نعتذر منك',
    message: 'الله سبحانه وتعالى احسن الجبر تم بيع هذا المزاد شكرا لك للمشاركة',
    buttons: [
      {
        text: 'تابع التسوق',
        role: 'confirm',
        cssClass: 'btn-primary'
      },
    ]
  });

  async errorAlert(msg: {name: '', message: ''}[]) {
    let Message = '';
    for(let mg of msg) {
      Message =mg.message
    }
    let alertErr = this.alertController.create({
      header: 'نعتذر منك',
      message: Message,
      buttons: [
        {
          text: 'تابع التسوق',
          role: 'confirm',
          cssClass: 'btn-primary'
        },
      ]
    });

    (await alertErr).present();
  }

  async addFish() {

    const alert = this.alertController.create({
      header: 'طلب العرض',
      message: 'هل انت متأكد من شراء العرض؟',
      buttons: [
        {
          text: 'تأكيد',
          role: 'confirm',
          handler: () => {
            this.general.addFish(this.id, this.packaging, this.slicing).subscribe(async (data: any) => {
              if(data.code == 1) {
                (await this.alertSuccss).present();
              } else {
                this.errorAlert(data.messages);
              }
            })
          }
        },
        {
          text: 'إلغاء',
          role: 'cancel'
        }
      ]
    });

    (await alert).present();
  }

  async shareProduct() {
    await Share.share({
      title: this.fishItem.name,
      text: this.fishItem.body,
      // url: 'http://ionicframework.com/',
      dialogTitle: 'شارك المزاد مع الآخرين',
    });
  }

}
