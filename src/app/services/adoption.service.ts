import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../pages/addadoption/post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient,
                private router: Router) {
    }
  // tslint:disable-next-line:typedef
  getPosts() {
    // new array of arrays and not change the original array
    this.http.get<{ message: string; posts: any }>
    ('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map( post => {
          // @ts-ignore
          // @ts-ignore
          // @ts-ignore
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            age: post.age,
            ville: post.ville,
            race: post.race,
            cetegorie: post.cetegorie,
            tel: post.tel,
            creator: post.creator
          };
        });
      }))
      .subscribe( (transformedPosts) => {
        console.log(transformedPosts);
        this.posts = transformedPosts;

        this.postsUpdated.next([...this.posts]);
      });
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // tslint:disable-next-line:typedef
  getPost(id: string) {
      return this.http.get<{ _id: string, title: string, content: string, 
        age: string,ville: string,race: string,cetegorie: string,tel: string,imagePath: string,
         creator: string}>('http://localhost:3000/api/posts/' + id);
  }
  // tslint:disable-next-line:typedef
  addPost(title: string, content: string, image: File,age: string,ville: string,race: string,cetegorie: string,tel: string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    postData.append('age', age);
    postData.append('ville', ville);
    postData.append('race', race);
    postData.append('cetegorie', cetegorie);
    postData.append('tel', tel);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe( responseData => {

        const post: Post = {
          id: responseData.post.id,
          title,
          content,age,ville,race,cetegorie,tel,
          imagePath: responseData.post.imagePath,
          creator: null
        };

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/menu/adoption']);
    });
  }

  // tslint:disable-next-line:typedef
  
  // tslint:disable-next-line:typedef
  deletePost(postID: string) {
      this.http.delete('http://localhost:3000/api/posts/' + postID)
        .subscribe(() => {
          const updatedPosts = this.posts.filter( post =>
            post.id !== postID);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
  }
}
