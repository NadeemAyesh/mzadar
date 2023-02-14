import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'active-account',
        loadChildren: () => import('./pages/auth/active-account/active-account.module').then( m => m.ActiveAccountPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/auth/profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
  {
    path: 'countries',
    loadChildren: () => import('./pages/countries/countries.module').then( m => m.CountriesPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'single-product/:id',
    loadChildren: () => import('./pages/single-product/single-product.module').then( m => m.SingleProductPageModule)
  },
  {
    path: 'static',
    children: [
      {
        path: 'choose-static',
        loadChildren: () => import('./pages/static/choose-static/choose-static.module').then( m => m.ChooseStaticPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('./pages/static/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
      },
      {
        path: 'terms',
        loadChildren: () => import('./pages/static/terms/terms.module').then( m => m.TermsPageModule)
      },
    ]
  },
  {
    path: 'single-fish/:id',
    loadChildren: () => import('./pages/single-fish/single-fish.module').then( m => m.SingleFishPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mazadaty',
    loadChildren: () => import('./pages/mazadaty/mazadaty.module').then( m => m.MazadatyPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
