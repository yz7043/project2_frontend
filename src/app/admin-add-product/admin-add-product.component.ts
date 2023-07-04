import { Component } from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {Router} from "@angular/router";
import {AdminProductModifyRequest} from "../models/product-dto";
import {catchError} from "rxjs";

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {
  productForm = new FormBuilder().group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    wholesalePrice: [0, [Validators.min(0)]],
    retailPrice: [0, [Validators.min(0)]],
    quantity: [0, [Validators.min(0)]]
  })
  constructor(private restAPI: RestApiService, private router: Router) {
  }

  cancelAdd(){
    this.router.navigate(['adminProduct']);
  }

  submit(){
    if (this.productForm.invalid) {
      const errorMessages = [];
      const controls = this.productForm.controls;
      for (let controlName in controls) {
        let controlErrors: ValidationErrors | null = controls[controlName as keyof typeof controls].errors;
        if (controlErrors != null) {
          for (let validationName in controlErrors) {
            errorMessages.push(`Field ${controlName} is invalid due to ${validationName}.`);
          }
        }
      }
      alert(errorMessages.join('\n').toString());
      return;
    }
    const name = this.productForm.get('name')?.value;
    const description =  this.productForm.get('description')?.value;
    const wholesalePrice = this.productForm.get('wholesalePrice')?.value;
    const retailPrice = this.productForm.get('retailPrice')?.value;
    const quantity = this.productForm.get('quantity')?.value;
    if(!name || ! description || !wholesalePrice || ! retailPrice || !quantity){
      alert("All fields are required!");
      return;
    }
    let product: AdminProductModifyRequest = {
      name: name,
      description: description,
      wholesalePrice: wholesalePrice,
      retailPrice: retailPrice,
      quantity: quantity
    }
    this.restAPI.adminAddProduct(product)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          alert("Add successfully!");
          this.router.navigate(['adminProduct']);
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
  }

}
