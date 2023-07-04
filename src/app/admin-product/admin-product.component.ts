import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {catchError} from "rxjs";
import {AdminProductDTO, AdminProductModifyRequest} from "../models/product-dto";
import {FormBuilder, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit{
  products: AdminProductDTO[] = []

  editProductForm = new FormBuilder().group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    wholesalePrice: [0, [Validators.min(0)]],
    retailPrice: [0, [Validators.min(0)]],
    quantity: [0, [Validators.min(0)]]
  })
  curId = -1;

  isShowEdit = false

  constructor(private restAPI: RestApiService, private router: Router) {
  }
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(){
    this.restAPI.getAdminAllProducts()
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.products = resp.products;
        },
        error: err => {
          console.log(err.error.message);
        }
      })
  }

  showEdit(product: AdminProductDTO){
    this.editProductForm.setValue({
      name: product.name,
      description: product.description,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      quantity: product.quantity
    });
    this.curId = product.id;
    this.isShowEdit = true;
  }

  cancelEdit(){
    this.editProductForm.setValue({
      name: '',
      description: '',
      wholesalePrice: 0,
      retailPrice: 0,
      quantity: 0
    })
    this.curId = -1;
    this.isShowEdit = false;
  }

  submitEdit(){
    if (this.editProductForm.invalid) {
      const errorMessages = [];
      const controls = this.editProductForm.controls;
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
    let patchedProduct: AdminProductModifyRequest = {
      name: this.editProductForm.get('name')?.value,
      description: this.editProductForm.get('description')?.value,
      wholesalePrice: this.editProductForm.get('wholesalePrice')?.value,
      retailPrice: this.editProductForm.get('retailPrice')?.value,
      quantity: this.editProductForm.get('quantity')?.value
    }
    this.restAPI.adminModifyProduct(patchedProduct, this.curId)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.cancelEdit();
          this.refreshData();
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
  }

  showDetail(id: number){
    this.router.navigate(['adminProductDetail'], {queryParams: {id: id}});
  }
  addProduct(){

  }

  protected readonly visualViewport = visualViewport;
}
