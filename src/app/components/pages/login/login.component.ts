import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errMsg = "";
  isLoginFailed = false;
  isLogin = false;

  constructor(private router: Router, private tokenStorage: TokenStorageService, private service: UserService) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLogin = true;
    }
    else {
      this.loginForm = new FormGroup({
        id: new FormControl(),
        password: new FormControl()
      });
    }
  
  }

  doLogin() {
    let login = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password
    };
    // alert("Email: " + login.staff_id +"Password: " +  login.password)
    this.service.login(login).subscribe((res) => {
      this.tokenStorage.saveToken(res.token);
      this.tokenStorage.saveUser(res.userCredentials);
      window.location.reload();
    },
      err => {
        this.errMsg = err.error.msg;
        this.isLoginFailed = true;
        console.log(err);
      }
    );
  }

}




