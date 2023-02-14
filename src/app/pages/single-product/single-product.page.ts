import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.page.html',
  styleUrls: ['./single-product.page.scss'],
})
export class SingleProductPage implements OnInit {

  qty: number = 1;
  productPrice: number = 42.95;
  totalAfterQty: number = 0;
  singleItem: any;
  id: string = '';
  public progress: number = 0.6;
  comments: any = [];
  showAlert: boolean = false;

  // bid: number = 0;

  announcement = [
    {
      announcementDetails: "",
      showMore: false
    },
  ];

  slicingMethods: any;
  PackagingMethods: any;

  erros: {
    name: '',
    message: '',
  }[] = [];

  showIt: boolean = false;
  user: any;

  constructor(private general: GeneralService, public loadingController: LoadingController, private route: ActivatedRoute, private alertController: AlertController, private router: Router) {
    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore: false
    }));
  }

  async ngOnInit() {

    const loading = await this.loadingController.create();
    await loading.present();
    this.route.params.subscribe(params => {
      this.id = params['id'] as string;
      this.general.getAuction(this.id).subscribe((data: any) => {
        if (data.code == 1) {
          this.singleItem = data.data;
          this.announcement[0].announcementDetails = this.singleItem.body;
          this.qty = this.singleItem.bid_price;
          this.checkMazad();
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
      this.general.getAuctionPercentage(this.id).subscribe((data: any) => {
        if (data.code == 1) {
          this.progress = data.data.count.percentage;
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });

      // this.getSlicingMethods();
      // this.getPackagingMethods();

      this.general.getAuctionComments(this.id).subscribe((data: any) => {
        if (data.code == 1) {
          this.comments = data.data.count.data;
        } else {
          this.showAlert = true;
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    });
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  checkMazad() {
    this.general.checkMazad(this.id).subscribe((data: any) => {
      console.log(data);
      if(data.code == 1) {
        this.showIt = true;
      } else {
        this.showIt = false;
      }
    })
  }

  trimString(string: string, length: number) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  minusQty() {

    if (this.qty > 1) {
      this.qty -= 1;
      this.totalAfterQty = this.productPrice * this.qty;
    }
  }

  plusQty() {

    if (this.qty > 0) {
      this.qty += 1;
      this.totalAfterQty = this.productPrice * this.qty;
    }
  }

  async addComment() {
    const loading = await this.loadingController.create();
    await loading.present();

    const alert = await this.alertController.create({
      header: 'تهانينا',
      subHeader: 'تم اضافة المزايدة بنجاح!',
      buttons: [
        {
          text: 'يلا بانتظاركم',
          role: 'confirm',
          handler: () => {

          },
        },
      ]
    });

    this.general.checkAuctionComment(this.id, this.qty).subscribe(async (data: any) => {
      if(data.success) {
        const alert2 = await this.alertController.create({
          header: 'تهانينا',
          subHeader: 'لقد تجاوزت الحد الاقصى بمبلغ ' + this.singleItem.last_price +
          'ر.س',
          buttons: [
            {
              text: 'إلغاء',
              role: 'cancel',
              handler: () => {

              },
            },
            {
              text: 'تأكيد الشراء',
              role: 'confirm',
              handler: () => {
                this.general.addAuctionComment(this.id, this.qty).subscribe(async (data: any) => {
                  if (data.code == 1) {

                    this.general.getAuction(this.id).subscribe(async (data: any) => {
                      if (data.code == 1) {
                        this.singleItem = data.data;
                        this.announcement[0].announcementDetails = this.singleItem.body;
                        if(this.singleItem.status) {
                          alert.present();
                        }
                      }
                      loading.dismiss();
                    }, err => {
                      loading.dismiss();
                    });

                    this.general.getAuctionComments(this.id).subscribe((data: any) => {
                      if (data.code == 1) {
                        this.comments = data.data.count.data;
                      } else {
                        this.showAlert = true;
                      }
                      loading.dismiss();
                    }, err => {
                      loading.dismiss();
                    });

                    this.general.getAuctionPercentage(this.id).subscribe((data: any) => {
                      if (data.code == 1) {
                        this.progress = data.data.count.percentage;
                      }
                      loading.dismiss();
                    }, err => {
                      loading.dismiss();
                    });

                    const appMobile = JSON.parse(localStorage.getItem('settings') as string)[0].mobile;
                    window.open('whatsapp://send?phone=' + appMobile);
                    this.ngOnInit();
                  }

                })
              },
            },
          ],
        });

        alert2.present();
      } else {
        this.general.addAuctionComment(this.id, this.qty).subscribe(async (data: any) => {
          if (data.code == 1) {
            alert.present();
            this.general.getAuction(this.id).subscribe(async (data: any) => {
              if (data.code == 1) {
                this.singleItem = data.data;
                this.announcement[0].announcementDetails = this.singleItem.body;
                if(this.singleItem.status) {
                  alert.present();
                }
              }
              loading.dismiss();
            }, err => {
              loading.dismiss();
            });

            this.general.getAuctionComments(this.id).subscribe((data: any) => {
              if (data.code == 1) {
                this.comments = data.data.count.data;
              } else {
                this.showAlert = true;
              }
              loading.dismiss();
            }, err => {
              loading.dismiss();
            });

            this.general.getAuctionPercentage(this.id).subscribe((data: any) => {
              if (data.code == 1) {
                this.progress = data.data.count.percentage;
              }
              loading.dismiss();
            }, err => {
              loading.dismiss();
            });
          } else {
            this.erros = data.messages
          }

        })
      }
      loading.dismiss();
    })
    /* this.general.addAuctionComment(this.id, this.qty).subscribe(async (data: any) => {
      if(data.code == 1) {

        this.general.getAuction(this.id).subscribe(async (data: any) => {
          if (data.code == 1) {
            this.singleItem = data.data;
            this.announcement[0].announcementDetails = this.singleItem.body;
            if(this.singleItem.status) {
              const alert2 = await this.alertController.create({
                header: 'تهانينا',
                subHeader: 'سوف يتم التواصل معك خلال دقيقتين لتسليم الطلب',
                buttons: ['يلا انظاركم'],
              });
              alert2.present();
            } else {
              alert.present();
            }
          }
          loading.dismiss();
        }, err => {
          loading.dismiss();
        });



        this.general.getAuctionComments(this.id).subscribe((data: any) => {
          if (data.code == 1) {
            this.comments = data.data.count.data;
          } else {
            this.showAlert = true;
          }
          loading.dismiss();
        }, err => {
          loading.dismiss();
        });

        this.general.getAuctionPercentage(this.id).subscribe((data: any) => {
          if (data.code == 1) {
            this.progress = data.data.count.percentage;
          }
          loading.dismiss();
        }, err => {
          loading.dismiss();
        });

      } else {

        const alertDanger = await this.alertController.create({
          header: 'خطأ في البينات المدخلة',
          subHeader: data.messages[0].message,
          buttons: ['تم'],
        });

        alertDanger.present();
      }
      loading.dismiss();
    }, async (err) => {
      const alertDanger = await this.alertController.create({
        header: 'خطأ غير متوقع!',
        subHeader: err.message,
        buttons: ['تم'],
      });
      alertDanger.present();
      loading.dismiss();
    }); */
  }

  async shareProduct() {
    await Share.share({
      title: this.singleItem.name,
      text: this.singleItem.body,
      // url: 'http://ionicframework.com/',
      dialogTitle: 'شارك المزاد مع الآخرين',
    });
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

  handleRefresh(event: any) {

    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ngOnInit();
    }, 2000);
  }

}
