import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import * as country from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public countryCodes = country.country;
  allCountries = country.country;
  searchText = '';
  selectedNumber: string = '+966';

  user = {
    mobile: '',
    password: ''
  }
  showPassword = false;

  @ViewChild('password') input!: HTMLInputElement;

  constructor(private auth: AuthService, public loadingController: LoadingController, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    // console.log(this.countryCodes)
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
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

  async login() {
    const mobile = this.selectedNumber + this.user.mobile;
    const loading = await this.loadingController.create();
    await loading.present();

    // loading.dismiss();
    const alert = await this.alertController.create({
      header: 'حدث خطأ!',
      subHeader: 'يرجى مراجعة البيانات المدخلة، ومن ثم حاول مجدداً.',
      buttons: ['تم'],
    });
    this.auth.login(this.user, mobile).subscribe(async (data: any) => {
      if(data.code == 1) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        loading.dismiss();
        this.auth.$loggedIn.emit(data.data);
        this.router.navigate(['/home']);
      } else {
        await alert.present();
        this.user.mobile = ''
      }
    }, async (err) => {
      loading.dismiss();
      await alert.present();
    })
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
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
        this.auth.$userUpdated.emit(user)
        loading.dismiss();
        // this.auth.$loggedIn.emit(data.data);
        this.router.navigate(['/home']);
      }
    })
  }


}
