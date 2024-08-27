import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
import { HttpClientModule } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit{
  allUserData = []; // Original data
  filteredUserData = []; // Data after applying filters
  uniqueRoles = [];
  uniqueAddresses = [];
  selectedRole = '';
  selectedAddress = '';
  all_user_data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_dto!:User;
  user_reg_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false; // For Form validation
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  signInFormValue:any ={}


  constructor( private formBuilder:FormBuilder, private router:Router,private adminService:AdminService){}

  ngOnInit(): void {
    
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })
    
  }
  getAllUser(){
    this.adminService.allUser().subscribe(data =>{
      this.all_user_data = data;
    },error =>{
      console.log("My error" , error)
    })
  }
  get rf(){
    return this.addEditUserForm.controls;
  }

  addUserPopup(){
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser(){
    this.addEditUser = true;
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto ={
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:this.user_reg_data.address,
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      role:this.user_reg_data.role
    }
    this.adminService.addUser(this.user_dto).subscribe(data=>{
      this.addEditUserForm.reset();
      this.getAllUser();
      $('#addEditUserModal').modal('toggle');
    },error=>{
      console.log("my wrong ", error);
    })
  }
  editUserPopup(user_id:any){
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    console.log(this.all_user_data);
    let editUser=this.all_user_data.find((e:any)=>e.id==user_id);
    // this.adminService.singleUser(user_id).subscribe(data=>{
      this.single_user_data = editUser;
      this.addEditUserForm.setValue({
        name:this.single_user_data.name,
        mobNumber:this.single_user_data.mobNumber,
        age:this.single_user_data.age,
        email:this.single_user_data.email,
        password:this.single_user_data.password,
        gender:this.single_user_data.gender,
        address:this.single_user_data.address,
        agreetc:this.single_user_data.agreeTerms,
        role:this.single_user_data.role
      });
    // }, 
    // error=>{
    //   console.log("My error", error)
    // })
  }
  updateUser(){debugger
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    let user_dto ={
      age:this.user_reg_data.age,
      agreeTerms:this.user_reg_data.agreetc,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:this.user_reg_data.address,
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      role:this.user_reg_data.role
    }
    this.adminService.editUser(this.edit_user_id,user_dto).subscribe(data=>{
      this.addEditUserForm.reset()
      this.getAllUser();
      $('#addEditUserModal').modal('toggle');
    },error=>{
      console.log("my wrong ", error);
    })
  }
  deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();
    }, error =>{
      console.log("My error", error)
    })
  }
}


