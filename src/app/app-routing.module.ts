import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { InspirationComponent } from './inspiration/inspiration.component';

const routes: Routes = [
  { path: '', redirectTo: '/bucketlist', pathMatch: 'full' },
  { path: 'bucketlist',  component: BucketlistComponent },
  { path: 'inspiration',  component: InspirationComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
