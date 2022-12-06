import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {
  }

  getDataOfDay(day: string) {
    return this.httpClient.get(`assets/data_${day}.txt`, {responseType: 'text'});
  }

  getTestDataOfDay(day: string) {
    return this.httpClient.get(`assets/data_${day}_test.txt`, {responseType: 'text'});
  }
}
