import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { GlobalService } from "../global.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private global: GlobalService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.global.user &&
      route.data.module &&
      this.global.user.permissions &&
      this.global.user.permissions.indexOf(route.data.module) === -1
    ) {
      // role not authorised so redirect to home page
      console.log("Invalid permission");
      this.router.navigate(["coupon"]);
      return false;
    }
    return true;
  }
}
