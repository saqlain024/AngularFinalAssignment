import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder, private httpclient: HttpClient) { }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  url = "http://localhost:8000/";
  isTrue = false
  isClicked = false
  data: any;

  onSubmit() {
    console.log(this.reactiveForm.value);
    this.data = this.reactiveForm.value;

    this.httpclient.post(this.url + "verifyUser", this.data).subscribe({
      next: (res) => {
        console.log(res);
        if (Array.isArray(res) && res.length > 0) {
          console.log("User verified");
          this.isTrue = true
        } else {
          console.log("User not verified");
        }
      },
      error: (err) => {
        console.error("lol");
      }
    });
    this.isClicked = true;
  }


}