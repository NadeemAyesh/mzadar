import { Component, OnInit, ViewChild } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import * as country from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import {Filesystem, Directory, FileInfo} from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { finalize } from 'rxjs/operators';
import {CameraPWA} from "@ionic/pwa-elements/dist/types/components/camera/camera";
/* Uopload Image */

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public countryCodes = country.country;
  allCountries = country.country;
  searchText = '';
  selectedNumber: string = '+966';

  user = {
    username: '',
    mobile: '',
    city_id: 1,
    password: ''
  }

  cities: {
    id: number,
    name: string
  }[] = [];

  userLocal: any;
  images: LocalFile[] = [];
  userImages: File[] = [];

  showPassword = false;
  @ViewChild('password') input!: HTMLInputElement;
  loggedUser: any;

  constructor(private auth: AuthService, private general: GeneralService, private alertController: AlertController,
              public loadingController: LoadingController, private plt: Platform, private toastCtrl: ToastController) { }

  async ngOnInit() {
    this.getCities();
    this.userLocal = JSON.parse(localStorage.getItem('user') as string);
    this.user.username = this.userLocal.username;
    this.user.mobile = this.userLocal.mobile ? this.userLocal.mobile.substr(4) : '+966';
    this.user.city_id = this.userLocal.city_id;
    this.selectedNumber = this.userLocal.mobile ? this.userLocal.mobile.slice(0, 4) : '';
    this.userLocal.image = this.userLocal.image ? this.userLocal.image : 'assets/4264622.png';
    await this.loadFiles();
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

  getCities() {
    this.general.getCities().subscribe((data: any) => {
      // console.log(data);
      if(data.code == 1) {
        this.cities = data.data;
      } else {
        // this.presentAlert();
      }
    }, err => {
      // this.presentAlert();
    })
  }

  makeItSelected(number: string) {
    this.selectedNumber = number;
  }

  async submitProfile() {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    const mobile = this.selectedNumber + this.user.mobile;
    this.auth.editProfile(this.user, mobile, this.userImages).subscribe((data: any) => {
      // console.log(data);
      if(data.code ==1 ) {
        loading.dismiss();
        this.presentToast('تم تعديل البيانات بنجاح شكراً لك!')
        this.userImages = [];
        this.userLocal.image = data.data.image;
        const user = {
          username: data.data.username,
          mobile: data.data.mobile,
          image: data.data.image,
          id: data.data.id,
          city: data.data.city,
          type: 'user'
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.auth.$userUpdated.emit(data.data)
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    })
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingController.create({
      message: 'جار التحميل...'
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data
    })
      .then(
        (result) => {
          this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: FileInfo[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f.name}`;
      // console.log(filePath)

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data
      });

      this.images.push({
        name: f.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
  }

  // Little helper
  async presentToast(text: any) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    await toast.present();
  }

  async deleteImage() {
    this.userImages = [];
    await this.loadFiles();
    await this.presentToast('File removed.');
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

  selectimage(e: any) {
    this.userImages.push(e.files[0])
    // console.log(this.userImages)
  }


}
