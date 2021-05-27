//my-pipes.ts
import { NgModule } from "@angular/core";
import { DateFormatPipe } from "./date-format.pipe";
@NgModule({
  imports: [],
  declarations: [DateFormatPipe],
  exports: [DateFormatPipe]
})
export class MyPipesModule {}
