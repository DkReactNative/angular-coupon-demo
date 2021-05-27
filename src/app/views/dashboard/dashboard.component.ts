import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../global.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  coupon: object = {};
  constructor(public global: GlobalService) {}

  ngOnInit() {
    this.global.currentCoupon.subscribe((message) => (this.coupon = message));
  }
}
