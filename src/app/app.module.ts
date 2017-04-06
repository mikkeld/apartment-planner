import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import { MaterializeModule } from 'angular2-materialize';
import { Ng2Webstorage, configure } from 'ng2-webstorage';
import { AppComponent } from './app.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { BucketlistFormComponent } from './bucketlist/bucketlist-form/bucketlist-form.component';
import { BucketlistService } from './bucketlist/bucketlist.service';
import { DroppableDirective } from './droppable.directive';

import { FirebaseModule } from './firebase/setup';

@NgModule({
  declarations: [
    AppComponent,
    BucketlistComponent,
    BucketlistFormComponent,
    DroppableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    Ng2Webstorage,
    FirebaseModule,
    AppRoutingModule
  ],
  providers: [BucketlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
