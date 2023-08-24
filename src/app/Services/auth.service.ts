import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment_dev as env } from 'src/environments/environment.development';
import { MSEncrypt } from '../Operations/operations';
import { set } from '../app.module';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private encrypt: MSEncrypt) { }
  API = set()
  AUTH_URL_ENDPOINT = "api/Authentication/"

  checkEmail(email: string) {
    const e = this.encrypt.encrypt(email)
    return this.http.get<any[]>(this.API + this.AUTH_URL_ENDPOINT + "check-email", {
      params: {
        "email": e
      }
    })
  }

  checkUsername(username: string) {
    const u = this.encrypt.encrypt(username)
    return this.http.get<any[]>(this.API + this.AUTH_URL_ENDPOINT + "check-username", {
      params: {
        "username": u
      }
    })
  }

  login(account: Account) {
    account.email = this.encrypt.encrypt(account.email)
    account.password = this.encrypt.encrypt(account.password)
    return this.http.post<any[]>(this.API + this.AUTH_URL_ENDPOINT + "login", account)
  }

  updateAccount(email:string, account: Account) {
    email = this.encrypt.encrypt(email)
    account.email = this.encrypt.encrypt(account.email)
    account.password = this.encrypt.encrypt(account.password)
    const req:any = {
      email:email,
      account:account
    }
    return this.http.put<any[]>(this.API + this.AUTH_URL_ENDPOINT + "update-account", req)
  }
  verifyAccount(email:string, code: number,v_or_c:boolean) {
    // email = this.encrypt.encrypt(email)
    
    const req:any = {
      email:email,
      code:code,
      v2_or_client:v_or_c
    }
    return this.http.put<any[]>(this.API + this.AUTH_URL_ENDPOINT + "verify-account", req)
  }

  deleteAccount(email:string) {
    email = this.encrypt.encrypt(email)
    return this.http.delete<any[]>(this.API + this.AUTH_URL_ENDPOINT + "delete-account", {params:{
      email:email
    }})
  }

  register(account: Account) {
    account.email = this.encrypt.encrypt(account.email)
    account.password = this.encrypt.encrypt(account.password)
    account.firstname = this.encrypt.encrypt(account.firstname)
    account.lastname = this.encrypt.encrypt(account.lastname)
    account.username = this.encrypt.encrypt(account.username)
    return this.http.post<any[]>(this.API + this.AUTH_URL_ENDPOINT + "register", account)
  }
}

@Injectable()
export class Account {
  id?: string
  email?: string
  firstname?: string
  lastname?: string
  username?: string
  password?: string
  verified?: boolean
  added?: Date
  updated?: Date

}
