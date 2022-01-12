import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
const routes: Routes = [
 {
 path: '',
 component: MenuPage,
 children: [
 {
 path: 'home',
 loadChildren: () => import('../../home/home.module').then( m =>
m.HomePageModule)
 },
 {
  path: 'adoption',
  loadChildren: () => import('../adoption/adoption.module').then( m => m.AdoptionPageModule)
},
{
  path: 'reclamation',
  loadChildren: () => import('../reclamation/reclamation.module').then( m => m.ReclamationPageModule)
},
{
  path: 'chat',
  loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
},
{
  path: 'store',
  loadChildren: () => import('../store/store.module').then( m => m.StorePageModule)
},
 ]
 }
];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class MenuPageRoutingModule {}
