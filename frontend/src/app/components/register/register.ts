import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = signal<string | null>(null);
  loading = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    this.authService.register(this.registerForm.value.username, this.registerForm.value.password)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/login']);
        },
        error: err => {
          this.loading.set(false);
          this.error.set(err?.error?.message || 'Registration failed');
        }
      });
  }
}
