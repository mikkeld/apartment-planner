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
import { InspirationComponent } from './inspiration/inspiration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {InspirationService} from './inspiration/shared/inspiration.service';
import { ChartsModule } from 'ng2-charts';
import { InspirationHeaderComponent } from './inspiration/inspiration-header/inspiration-header.component';
import { InspirationListComponent } from './inspiration/inspiration-list/inspiration-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BucketlistComponent,
    BucketlistFormComponent,
    DroppableDirective,
    InspirationComponent,
    InspirationHeaderComponent,
    InspirationListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    Ng2Webstorage,
    FirebaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [BucketlistService, InspirationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
