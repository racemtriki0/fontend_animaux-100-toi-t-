import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdoptionService } from 'src/app/services/adoption.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Post } from '../addadoption/post.model';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.page.html',
  styleUrls: ['./adoption.page.scss'],
})
export class AdoptionPage implements OnInit {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post'},
  //   {title: 'second', content: 'This is the second post'},
  //   {title: 'thirdPost', content: 'This is the third post'},
  // ];
  racem = true;
  condition=true;

 posts: Post[] = [];
 private postsSub: Subscription;
 private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
 constructor(public postService: AdoptionService,
             private authService: AuthentificationService,private router:Router) {

 }
  // tslint:disable-next-line:typedef
 ngOnInit() {
   this.postService.getPosts();
   this.userId = this.authService.getUserId();
   this.postsSub = this.postService.getPostUpdateListener()
     .subscribe((posts: Post[]) => {
       this.posts = posts.reverse();
     });
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
     this.userId = this.authService.getUserId();
     });

 }
  // tslint:disable-next-line:typedef
 onDelete(postID: string) {
this.postService.deletePost(postID);
}

onSwitch() {
  this.racem = !this.racem;
  this.condition = !this.condition;
}
  // tslint:disable-next-line:typedef
 ngOnDestroy() {
   this.postsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
 open(){
  //this.router.navigateByUrl('/menu/addadoption');
  this.router.navigate(['/addadoption']);
}
}

  
