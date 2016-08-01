import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPublic {

    steps = ['上海一区', '专用VPC网络', '公网IP'];

}
