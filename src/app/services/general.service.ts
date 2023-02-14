import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get(environment.baseUrl + environment.cities);
  }

  getAuctions() {
    return this.http.get(environment.baseUrl + environment.auctions);
  }

  getAuction(id: string) {
    return this.http.get(environment.baseUrl + environment.auction + '/' + id);
  }

  getAuctionComments(id: string) {
    return this.http.get(environment.baseUrl + environment.auctions + '/' + environment.comments + '/' + id);
  }

  getAuctionPercentage(id: string) {
    return this.http.get(environment.baseUrl + environment.auctions + '/' + environment.percentage + '/' + id);
  }

  addAuctionComment(id: string, bid: number) {
    const token = localStorage.getItem('token');
    return this.http.post(environment.baseUrl + environment.auctions + '/' + environment.comments + '/' + id + '/' + environment.add, {
      bid: bid,
      token: token
    });
  }

  checkAuctionComment(id: string, bid: number) {
    const token = localStorage.getItem('token');
    return this.http.post(environment.baseUrl + environment.auctions + '/' + environment.comments + '/' + id + '/' + environment.check, {
      bid: bid,
      token: token
    });
  }

  getFish(id: number) {
    return this.http.get(environment.baseUrl + environment.fish + '?category_id=' + id );
  }

  getSingleFish(id: string) {
    return this.http.get(environment.baseUrl + environment.fish + '/' + id );
  }

  getFishCategories() {
    return this.http.get(environment.baseUrl + environment.fish + '/' + environment.categories);
  }

  getSlicingMethods(fishID: number) {
    return this.http.get(environment.baseUrl + environment.fish + '/slicing/' + fishID);
  }

  getPackagingMethods(fishID: number) {
    return this.http.get(environment.baseUrl + environment.fish + '/packaging/' + fishID);
  }

  getSettings() {
    return this.http.get(environment.baseUrl + environment.settings);
  }

  search(name: string, search: string) {
    return this.http.get(environment.baseUrl + environment.search, {
      params: {type: name, search: search}
    });
  }

  addFish(id: string, packaging: any, slicing: any) {
    const token = localStorage.getItem('token');
    return this.http.post(environment.baseUrl + environment.fish + '/' + id + '/' + environment.add, {
      packaging: packaging,
      slicing: slicing,
      token: token
    });
  }

  // http://localhost/auctions/api/auctions/check
  checkAuctionLink() {
    return this.http.get(environment.baseUrl + environment.auctions + '/check');
  }

  getFishImages(id: any) {
    return this.http.get(environment.baseUrl + environment.fish + '/images/' + id);
  }

  checkMazad(id: any) {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(environment.baseUrl + 'auctions/check/message/' + id, {
      headers: headers
    });
  }

  checkFish(id: any) {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get(environment.baseUrl + 'fish/check/message/' + id, {
      headers: headers
    });
  }
}
