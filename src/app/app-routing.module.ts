import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketlistComponent } from './bucketlist/bucketlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/bucketlist', pathMatch: 'full' },
  { path: 'bucketlist',  component: BucketlistComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
