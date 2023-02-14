import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $loggedIn = new EventEmitter();
  public $userUpdated = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(user: any, mobile: string) {
    user.mobile = mobile;
    return this.http.post(environment.baseUrl + environment.login, user);
  }

  register(user: any, mobile: string) {
    user.mobile = mobile;
    return this.http.post(environment.baseUrl + environment.register, user);
  }

  getFishProfile(categoryId: any) {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(environment.baseUrl + environment.profile + '/' + environment.fish,
    {
      params: {
        category_id: categoryId
      },
      headers: headers
    });
  }

  getFishAuctions() {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(environment.baseUrl + environment.profile + '/' + environment.auctions,
    {
      headers: headers
    });
  }

  getProfile() {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(environment.baseUrl + environment.profile + '/get',
    {
      headers: headers
    });
  }

  visitors() {
    return this.http.get(environment.baseUrl + environment.visitors);
  }

  editProfile(user: any, mobile: any, userImages: File[]) {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    // console.log(userImages)

    const fromData = new FormData();
    fromData.set('mobile', mobile)
    fromData.set('username', user.username)
    fromData.set('city_id', user.city_id)
    fromData.set('password', user.password)
    fromData.set('image', userImages[0])

    /* const User = {
      mobile: mobile,
      username: user.username,
      city_id: user.city_id,
      password: user.password
    } */
    return this.http.post(environment.baseUrl + environment.profile + '/edit', fromData, {
      headers: headers
    });
  }
}
