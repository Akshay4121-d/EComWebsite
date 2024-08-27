import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  signInFormValue: any = {};
  user_data: any;
  constructor(private router: Router, private loginService: LoginSignupService) {

  }
  ngOnInit(): void {

  }
  onSubmitSignIn() {
    let loginObj = {
      email: this.signInFormValue.userEmail,
      password: this.signInFormValue.userPassword
    }
    this.loginService.adminLogin(loginObj).subscribe(data => {
      this.user_data = data;
      if (this.user_data != null) {
        sessionStorage.setItem("user_session_id", this.user_data.id);
        sessionStorage.setItem("role", this.user_data.role);
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        alert("Invailid Response")
      }
      console.log(this.user_data);
    }, (error: any) => {
      console.log("My Error", error)
    })
  }
}
