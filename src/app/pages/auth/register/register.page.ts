import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as country from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public countryCodes = country.country;
  allCountries = country.country;
  searchText = '';
  selectedNumber: string = '+966';

  cities: {
    id: number,
    name: string
  }[] = [];

  user = {
    username: '',
    mobile: '',
    city_id: 1,
    password: ''
  }

  showPassword = false;

  constructor(private auth: AuthService, private general: GeneralService, private alertController: AlertController, public loadingController: LoadingController, private route: Router) { }

  ngOnInit() {
    this.getCities()
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  search(value: string): void {
    if(!value) {
      this.allCountries = country.country
    } else {
      this.allCountries = this.countryCodes.filter((val) =>
        val.number.toLowerCase().includes(value)
      );
    }
  }

  makeItSelected(number: string) {
    this.selectedNumber = number;
  }

  async register() {
   const mobile = this.selectedNumber + this.user.mobile;
    const loading = await this.loadingController.create();
    await loading.present();

    loading.dismiss();
    const alert = await this.alertController.create({
      header: 'حدث خطأ!',
      subHeader: 'يرجى مراجعة البيانات المدخلة، ومن ثم حاول مجدداً.',
      buttons: ['تم'],
    });

    this.auth.register(this.user, mobile).subscribe(async (data: any) => {
      // console.log(data);
      if(data.code == 1) {
        loading.dismiss();
        this.successAlert('نجحت العملية', 'تم تسجيلك بنجاح، قم بتسجيل الدخول');
        this.route.navigate(['/auth/login'])
      } else {
        await alert.present();
      }
    }, async (err) => {
      loading.dismiss();
      await alert.present();
    });
  }

  async successAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: ['تم'],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'حدث خطأ!',
      subHeader: 'هناك خطأ في جلب البيانات، حاول مجدداً في وقت لاحق.',
      buttons: ['تم'],
    });

    await alert.present();
  }

  getCities() {
    this.general.getCities().subscribe((data: any) => {
      // console.log(data);
      if(data.code == 1) {
        this.cities = data.data;
      } else {
        this.presentAlert();
      }
    }, err => {
      this.presentAlert();
    })
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  async loginAsVisitor() {
    const user = {
      username: 'زائر',
      image: '',
      type: 'visitor'
    }
    const loading = await this.loadingController.create();
    await loading.present();
    this.auth.visitors().subscribe((data: any) => {
      // console.log(data);
      if( data.code == 1) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        loading.dismiss();
        // this.auth.$loggedIn.emit(data.data);
        this.route.navigate(['/home']);
      }
    })
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
            this.route.navigate(['/auth/login']);
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
