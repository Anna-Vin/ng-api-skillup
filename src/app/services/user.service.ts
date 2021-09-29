import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { HomePageUser } from '../models/homepageUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public userIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isUserExistSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.BASE_URL}/users`);
  }

  userId$(): Observable<number> {
    return this.userIdSubject.asObservable();
  }

  isUserExist$(): Observable<boolean> {
    return this.isUserExistSubject.asObservable()
  }

  
  public mapUserForTable(user: User): HomePageUser {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      address: `${user.address.city}, ${user.address.street}, ${user.address.building}`,
      phone: user.phone,
    };
  }
  
  public getSingleUserInfo(id: number): Observable<User> {
    return this.http.get<User>(`${environment.BASE_URL}/users/${id}`);
  }
  
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.BASE_URL}/users/${user.id}`, user)
  }

}
