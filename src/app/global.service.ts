import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { environment } from "../environments/environment";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  mobileCms: any = false;
  loginTime: any = null;
  setupTime = environment.setupTime;
  setupHours = 24 * 60 * 60 * 1000;
  isLogin = false;
  loader;
  apiUrl = environment.apiUrl;
  user: any = {};
  AuthToken = null;
  deviceInfo = null;
  max_767_width;
  isPhone: any = false;
  session: any;
  public couponDetails: any = {};
  private subject = new BehaviorSubject(this.couponDetails);
  currentCoupon = this.subject.asObservable();
  constructor(
    public toastrService: ToastrService,
    public ngxService: NgxUiLoaderService,
    public router: Router,
    public sessionStorage: SessionService
  ) {
    toastrService["options"] = {
      preventDuplicates: true,
      preventOpenDuplicates: true,
    };
    console.log("sessionStorage.session ------------>", sessionStorage.session);
    this.session = sessionStorage.session;
    this.user = this.session.getSession("user-demo");
  }

  changeCoupon(data: object) {
    this.subject.next(data);
  }

  showToast(title = "", message = "") {
    this.toastrService.success("", message);
  }

  showDangerToast(title = "", message = "") {
    this.toastrService.error("", message);
  }

  showWarningToast(title = "", message = "") {
    this.toastrService.warning("", message);
  }

  showSuccess(message, title = "Success") {
    Swal.fire(title, message, "success");
  }

  showError(message, title = "Success") {
    Swal.fire(title, message, "error");
  }
}
