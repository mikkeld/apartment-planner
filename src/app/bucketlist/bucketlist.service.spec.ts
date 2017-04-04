/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BucketlistService } from './bucketlist.service';

describe('BucketlistServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketlistService]
    });
  });

  it('should ...', inject([BucketlistService], (service: BucketlistService) => {
    expect(service).toBeTruthy();
  }));
});
