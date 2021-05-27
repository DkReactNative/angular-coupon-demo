import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";

// Import containers
import { DefaultLayoutComponent } from "./containers";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { CouponComponent } from "./views/coupon/coupon.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { AppComponent } from "./app.component";
const APP_CONTAINERS = [DefaultLayoutComponent];

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { ToastrModule } from "ngx-toastr";
import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from "ngx-ui-loader";

// import internal module
import { AuthGuard } from "./guards/AuthGuard";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  imports: [
    BrowserModule,
    AngularEditorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      maxOpened: 1,
    }),
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    CouponComponent,
  ],
  exports: [],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuard,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
