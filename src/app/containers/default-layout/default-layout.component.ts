import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { GlobalService } from "../../global.service";
import { Router, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(public global: GlobalService, public router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.global.session.clearItem("user-tolivi");
    this.global.session.clearItem("setupTime-tolivi");
    this.global.session.clearItem("jwt-tolivi");
    this.global.user = {};
    this.global.isLogin = false;
    this.global.AuthToken = "";
    this.router.navigate(["login"]);
  }
}
