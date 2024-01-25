import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DisplayComponent } from './display/display.component';
import { ProductsComponent } from './products/products.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



export const routes: Routes = [

    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'display', component: DisplayComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'myprofile', component: MyProfileComponent },

    { path: 'product-details/:id', component: ProductDetailsComponent },

];
