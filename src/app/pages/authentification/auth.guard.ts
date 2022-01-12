import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthentificationService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> 
 /*  {
  const isAuth = this.authService.getIsAuth();
  const Jwt=this.authService.getToken();
  if (!Jwt && !isAuth) {
    this.router.navigate(['/authentification']);
    return false;
  }else{
    return true;
  }
  

  }
} 
 */

{
  const isAuth = this.authService.getIsAuth();
  if (!isAuth) {
    this.router.navigate(['/authentification']);
  }
  return isAuth;
  }
}
