import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GeneralService } from './services/general.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'الرئيسية', url: '/home', icon: 'home-outline' },
  ];

  logged: boolean = false;
  user: any;

  constructor(private auth: AuthService, private general: GeneralService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (localStorage.getItem('token')) {
      this.logged = true;
    }

    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
      if (this.user.type == 'visitor') {
        this.appPages = [];
        this.appPages = [
          { title: 'الرئيسية', url: '/home', icon: 'home-outline' },
          { title: ' الامان والاحكام', url: '/static/choose-static', icon: 'reader-outline' },
        ];
      } else {
        this.appPages = [
          { title: 'الرئيسية', url: '/home', icon: 'home-outline' },
          { title: 'الملف الشخصي', url: '/auth/profile', icon: 'person-outline' },
          { title: 'عروضي', url: '/offers', icon: 'clipboard-outline' },
          { title: 'مزداتي', url: '/mazadaty', icon: 'document-outline' },
          { title: ' الامان والاحكام', url: '/static/choose-static', icon: 'reader-outline' },
        ];
      }
    }

    this.auth.$loggedIn.subscribe((data: string) => {
      if (data) {
        this.logged = true;
        this.user = data;
        this.appPages = [
          { title: 'الرئيسية', url: '/home', icon: 'home-outline' },
          { title: 'الملف الشخصي', url: '/auth/profile', icon: 'person-outline' },
          { title: 'عروضي', url: '/offers', icon: 'clipboard-outline' },
          { title: 'مزداتي', url: '/mazadaty', icon: 'document-outline' },
          { title: ' الامان والاحكام', url: '/static/choose-static', icon: 'reader-outline' },
        ];
      }
    })

    this.auth.$userUpdated.subscribe((data: any) => {
      if (data) {
        this.user = data;
        if (this.user.type == 'visitor') {
          this.appPages = [];
          this.appPages = [
            { title: 'الرئيسية', url: '/home', icon: 'home-outline' },
            { title: ' الامان والاحكام', url: '/static/choose-static', icon: 'reader-outline' },
          ];
        }
      }
    })
    this.getSettings();
  }

  getSettings() {
    this.general.getSettings().subscribe((data: any) => {
      if (data.code == 1) {
        const settings = JSON.stringify(data.data);
        localStorage.setItem('settings', settings)
      }
    })
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/auth/login']);
  }
}
