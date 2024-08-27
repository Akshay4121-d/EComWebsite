import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent implements OnInit {
  regForm: boolean = false;
  signUpfrom!: FormGroup;
  signInfrom!: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginSignupService,private toast : ToastrService) {
  }
  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpfrom = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  get rf() {
    return this.signUpfrom.controls;
  }

  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpfrom.invalid) {
      return;
    }
    this.user_reg_data = this.signUpfrom.value;
    this.user_dto = {
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: this.user_reg_data.address,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      role: this.user_reg_data.role
    }
    this.loginService.userRegister(this.user_dto).subscribe((data: any) => {
      this.toast.success("User Register Successfull ☺");
      this.router.navigateByUrl('/sign-in');
    })
  }
  onSubmitSignIn() {
    let loginObj = {
      email: this.signInFormValue.userEmail,
      password: this.signInFormValue.userPassword
    }

    this.loginService.authLogin(loginObj).subscribe(
      data => {
        this.user_data = data;
        if (this.user_data !== null) {
          this.toast.success("Login Successfull")
          if (this.user_data.role === "seller") {
            sessionStorage.setItem("user_session_id", this.user_data.id);
            sessionStorage.setItem("role", this.user_data.role);
            this.router.navigateByUrl('/seller-dashboard');
          } else if (this.user_data.role === "buyer") {
            sessionStorage.setItem("user_session_id", this.user_data.id);
            sessionStorage.setItem("role", this.user_data.role);
            this.router.navigateByUrl('/buyer-dashboard');
          } else {
            alert("Invalid login details");
          }
        } else {
          alert("Invalid");
        }
        console.log(this.user_data);
      },
      () => {
        this.toast.error("Invalid credentials");
        console.log("Error occurred during authentication");
      }
    );
    
  }
}
