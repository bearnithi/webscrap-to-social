import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class ApiSerice {
    
    constructor(private http: HttpService) {}
    get(url): Observable<AxiosResponse<any>> {
      return  this.http.get(url);
    }

    post(url, data): Observable<AxiosResponse<any>> {
        return this.http.post(url, data);
    }
}