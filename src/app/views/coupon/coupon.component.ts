import { Component } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { GlobalService } from "../../global.service";
import { AppDateAdapter, APP_DATE_FORMATS } from "../../helpers/material-date";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { CustomValidators } from "ng2-validation";
import { DateValidators } from "../../validator.service";

@Component({
  selector: "app-coupon",
  templateUrl: "coupon.component.html",
  styleUrls: ["coupon.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class CouponComponent {
  formData;
  disabledBtn: number = 0;
  formSubmitAttempt: boolean = false;

  couponType: Array<object> = [
    { value: 1, label: "User" },
    { value: 2, label: "All" },
    { value: 3, label: "Customer" },
  ];

  availability: Array<object> = [
    { value: "is_unlimited", label: "Unlimited" },
    { value: "fix", label: "Fixed" },
  ];

  couponStatus: Array<object> = [
    { value: 1, label: "Active" },
    { value: 0, label: "In Active" },
  ];

  disscountType: Array<object> = [
    { value: "percentage", label: "Percentage" },
    { value: "flat", label: "Flat" },
  ];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "10rem",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "v1/image",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };

  constructor(
    private formBuilder: FormBuilder,
    public global: GlobalService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        couponCode: new FormControl("", [
          Validators.required,
          CustomValidators.rangeLength([3, 55]),
        ]),
        couponCount: new FormControl({ disabled: true, value: "" }, [
          Validators.required,
          CustomValidators.number,
        ]),
        couponType: new FormControl("", Validators.required),
        htmlContent: new FormControl("", Validators.required),
        availability: new FormControl("", Validators.required),
        status: new FormControl("", Validators.required),
        startDate: new FormControl("", Validators.required),
        endDate: new FormControl("", Validators.required),
        rules: this.formBuilder.array([this.newRules()]),
      },
      { validator: DateValidators }
    );

    this.global.session.setSession("user-coupon", {
      permissions: ["dashboard"],
      role: "user",
    });

    this.formData.get("availability").valueChanges.subscribe((value) => {
      console.log(value);
      if (value == "is_unlimited") {
        this.formData.get("couponCount").disable();
      } else {
        this.formData.get("couponCount").enable();
      }
    });
  }

  get rules(): FormArray {
    return this.formData.get("rules") as FormArray;
  }

  newRules(): FormGroup {
    return this.formBuilder.group({
      minAmount: new FormControl("", [
        Validators.required,
        CustomValidators.number,
      ]),
      maxAmount: new FormControl("", [CustomValidators.number]),
      disscountType: new FormControl("", [Validators.required]),
      disscount: new FormControl("", [CustomValidators.number]),
      maxDisscount: new FormControl("", [CustomValidators.number]),
    });
  }

  addRules() {
    this.rules.push(this.newRules());
  }

  removeRules(i: number) {
    this.rules.removeAt(i);
  }

  submit(formdata) {
    console.log(this.formData);
    if (this.disabledBtn) {
      return;
    }
    this.disabledBtn = 1;
    this.formSubmitAttempt = true;
    if (!this.formData.valid) {
      this.disabledBtn = 0;
      this.global.showDangerToast("Error", "Please fill all details");
      return;
    } else {
      console.log(formdata);
      this.global.user = {
        permissions: ["dashboard", "events"],
        role: "user",
      };
      this.global.session.setSession("user-demo", {
        permissions: ["dashboard", "events"],
        role: "user",
      });
      this.global.changeCoupon(formdata);
      this.route.navigate(["dashboard"], { replaceUrl: true });
    }
  }

  isControllvalid(value) {
    if (
      value.invalid &&
      (value.dirty || value.touched || this.formSubmitAttempt)
    ) {
      return true;
    }
    return false;
  }

  isRuleControllValid(item) {
    if (
      item &&
      item.invalid &&
      (item.dirty || item.touched || this.formSubmitAttempt)
    ) {
      return true;
    }
    return false;
  }
}
