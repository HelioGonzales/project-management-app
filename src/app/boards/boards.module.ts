import { FooterModule } from './../shared/modules/footer/footer.module';
import { InlineFormModule } from './../shared/modules/inline-form/inline-form.module';
import { BoardsService } from './../shared/services/boards.service';
import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
  },
];

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InlineFormModule,
    TopbarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FooterModule,
  ],
  providers: [AuthGuard, BoardsService],
})
export class BoardsModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    '/project-management-app/assets/i18n/',
    '.json'
  );
}
