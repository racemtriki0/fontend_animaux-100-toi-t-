import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthData } from '../pages/authentification/auth-data.module';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private token: string;
 
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private userId: string;
  public username: string;
  public user: string;
  constructor(private http: HttpClient,
              private router: Router) {}

  
  getToken() {
    return this.token;
  }
  
  getIsAuth() {
    return this.isAuthenticated;
  }
  
  getUserId() {
    return this.userId;
  }

  // tslint:disable-next-line:typedef
  getUsername() {
   return this.username;
  }

  // tslint:disable-next-line:typedef
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // tslint:disable-next-line:typedef
  createUser(email: string, password: string) {
      const authData: AuthData = { email, password};
      return this.http
       .post('http://localhost:3000/api/user/signup', authData)
        .subscribe(() => {
          this.router.navigate(['/menu/home']);
        }, error => {
         this.authStatusListener.next(false);
        }
       );
    }

  // tslint:disable-next-line:typedef
    login(email: string, password: string) {
      const authData: AuthData = { email, password};
      this.http.post<{token: string, expiresIn: number, userId: string, username: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.username = response.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate =  new Date(now.getTime() + expiresInDuration * 10000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.username);
          this.router.navigate(['/menu/home']);
        }
      }, error => {
        this.authStatusListener.next(false);


      });
    }

  // tslint:disable-next-line:typedef
    autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.username = authInformation.username;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    }

  // tslint:disable-next-line:typedef
    private setAuthTimer(duration: number) {
      console.log('timer' + duration);
     
      
    }
  // tslint:disable-next-line:typedef
    logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.username = null;
    
    this.clearAuthData();
    this.router.navigate(['/authentification']);
    }

    // tslint:disable-next-line:typedef
    private saveAuthData(token: string, expirationDate: Date, userId: string, username: string) {
     localStorage.setItem('token', token);
     localStorage.setItem('expiration', expirationDate.toISOString());
     localStorage.setItem('userId', userId);
     localStorage.setItem('username', username);

    }

  // tslint:disable-next-line:typedef
    private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  // tslint:disable-next-line:typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');


    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId, username
    };
  }
  }