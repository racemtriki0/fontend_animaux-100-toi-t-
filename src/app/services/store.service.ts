import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '../pages/store/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private stores: Store[] = [];
  private storesUpdated = new Subject<Store[]>();

    constructor(private http: HttpClient,
                private router: Router) {
    }
  // tslint:disable-next-line:typedef
  getPosts() {
    // new array of arrays and not change the original array
    this.http.get<{ message: string; stores: any }>
    ('http://localhost:3000/api/stores')
      .pipe(map((storeData) => {
        return storeData.stores.map( store => {
          // @ts-ignore
          // @ts-ignore
          // @ts-ignore
          return {
            nom: store.nom,
            prix: store.prix,
            id: store._id,
            imagePath: store.imagePath,
            tel:store.tel,
            desc:store.desc,
            creator: store.creator
          };
        });
      }))
      .subscribe( (transformedStores) => {
        console.log(transformedStores);
        this.stores = transformedStores;

        this.storesUpdated.next([...this.stores]);
      });
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.storesUpdated.asObservable();
  }

  // tslint:disable-next-line:typedef
  getPost(id: string) {
      return this.http.get<{ _id: string, title: string, content: string, imagePath: string,age:string,
         creator: string}>('http://localhost:3000/api/stores/' + id);
  }
  // tslint:disable-next-line:typedef
  addPost(nom: string, prix: string, image: File,tel:string,desc:string) {
    const storeData = new FormData();
    storeData.append('nom', nom);
    storeData.append('prix', prix);
    storeData.append('image', image, nom);
    storeData.append('tel', tel);
    storeData.append('desc', desc);

    this.http.post<{message: string, store: Store}>('http://localhost:3000/api/stores', storeData)
      .subscribe( responseData => {

        const store: Store = {
          id: responseData.store.id,
          nom,
          prix,
          imagePath: responseData.store.imagePath,
          tel,
          desc,
          creator: null
        };

        this.stores.push(store);
        this.storesUpdated.next([...this.stores]);
        this.router.navigate(['/menu/store']);
    });
  }

  // tslint:disable-next-line:typedef
  
  // tslint:disable-next-line:typedef
  deletePost(storeID: string) {
      this.http.delete('http://localhost:3000/api/stores/' + storeID)
        .subscribe(() => {
          const updatedstores = this.stores.filter( store =>
            store.id !== storeID);
          this.stores = updatedstores;
          this.storesUpdated.next([...this.stores]);
        });
  }
}