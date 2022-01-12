import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './pages/authentification/auth.guard';


const routes: Routes = [
 {
 path: '',
 redirectTo: 'menu/home',
 pathMatch: 'full'
 },
 {
 path: 'menu',
 loadChildren: () => import('./pages/menu/menu.module').then( m =>
m.MenuPageModule),
canActivate: [AuthGuard]
 },
{
path: 'authentification',
loadChildren: () => import('./pages/authentification/authentification.module').then(
m => m.AuthentificationPageModule)
},
{
path: 'inscription',
loadChildren: () => import('./pages/inscription/inscription.module').then( m =>
m.InscriptionPageModule)
},{
    path: 'addadoption',
    loadChildren: () => import('./pages/addadoption/addadoption.module').then( m =>
       m.AddadoptionPageModule),
       canActivate: [AuthGuard]
  }, {
    path: 'addstore',
    loadChildren: () => import('./pages/addstore/addstore.module').then( m => m.AddstorePageModule)
  },
 
  

  
  
  
];
@NgModule({
 imports: [
 RouterModule.forRoot(routes)
 ],
 exports: [RouterModule],
 providers: [AuthGuard]
 
})
export class AppRoutingModule { }
