import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from './store.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
 
 stores: Store[] = [];
 private postsSub: Subscription;
 private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
 constructor(public storeService: StoreService,
             private authService: AuthentificationService,private router:Router) {

 }
  
 ngOnInit() {
   this.storeService.getPosts();
   this.userId = this.authService.getUserId();
   this.postsSub = this.storeService.getPostUpdateListener()
     .subscribe((stores: Store[]) => {
       this.stores = stores;
     });
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
     this.userId = this.authService.getUserId();
     });

 }

 onDelete(storeID: string) {
this.storeService.deletePost(storeID);
}
  
 ngOnDestroy() {
   this.postsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
 open(){
  
  this.router.navigate(['/addstore']);
}

}
