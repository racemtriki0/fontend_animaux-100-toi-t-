import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private autServ: AuthentificationService) { }

  ngOnInit() {
  }
  public pages = [
    {titre: 'Accueil', chemin: '/menu/home', icone: 'home-outline'},
    {titre: 'Adoption', chemin: '/menu/adoption', icone: 'heart-circle-outline'},
    {titre: 'Reclamation', chemin: '/menu/reclamation', icone: 'receipt-outline'},
    {titre: 'Store', chemin: '/menu/store', icone: 'logo-google-playstore'},
    {titre: 'Déconnexion', chemin: 'deconnexion', icone: 'log-out-outline'}
   ];

   onMenuItem(p) {
    if (p.chemin === 'deconnexion') {
    this.autServ.logout();
    this.router.navigateByUrl('/authentification');
    } else {
    this.router.navigateByUrl(p.chemin);
    }
   }
   
   

}
