import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = signal<boolean>(false);
  productId = signal<string | null>(null);
  loading = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId.set(id);
      if (id) {
        this.isEditMode.set(true);
        this.loading.set(true);
        this.productService.getProduct(id).subscribe(product => {
          this.productForm.patchValue(product);
          this.loading.set(false);
        }, () => this.loading.set(false));
      } else {
        this.isEditMode.set(false);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.loading.set(true);

    if (this.isEditMode() && this.productId()) {
      this.productService.updateProduct(this.productId()!, this.productForm.value).subscribe(() => {
        this.loading.set(false);
        this.router.navigate(['/products']);
      }, () => this.loading.set(false));
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.loading.set(false);
        this.router.navigate(['/products']);
      }, () => this.loading.set(false));
    }
  }
}
