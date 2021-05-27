import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";

const materialModules = [
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatIconModule,
  MatSelectModule,
  MatNativeDateModule,
  MatRippleModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class AngularMaterialModule {}
