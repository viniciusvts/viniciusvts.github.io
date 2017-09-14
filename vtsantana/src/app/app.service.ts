import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
	biojson: string = '../assets/user.json';

	getBio(): Promise<any> {
		return this.http.get(this.biojson).toPromise();
	}
  constructor(private http: HttpClient) { }

}
