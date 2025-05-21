import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postRoomDetails(roomDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/admin/room", roomDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getRooms(pageNumber:number): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/rooms/${pageNumber}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(){
    let authHeader: HttpHeaders = new HttpHeaders();
    console.log("Authorization", UserStorageService.getToken())
    
    return authHeader.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

}
