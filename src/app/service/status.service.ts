import { Injectable } from '@angular/core';

@Injectable()
export class StatusService {
  public status = '加载中';
  public status_dot = false;
  public deviceOnline = false;
  public step = 2;
}
