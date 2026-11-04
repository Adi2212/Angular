import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

/**
 * Custom cross-field validator to ensure password and confirmPassword match.
 */
function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  submittedData = signal<any | null>(null);

  // Strongly-typed Reactive FormGroup
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          nonNullable: true,
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      { validators: [passwordsMatchValidator] }
    ),
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      number: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)],
        nonNullable: true,
      }),
      city: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }),
    // Select List input
    role: new FormControl<string>('student', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // Radio Group 1: Account Type
    accountType: new FormControl<'personal' | 'business' | 'academic'>('personal', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // Radio Group 2: Billing / Subscription Cycle
    billingCycle: new FormControl<'monthly' | 'annually'>('monthly', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // Checkbox Group: Acquisition channel
    source: new FormGroup({
      google: new FormControl(false, { nonNullable: true }),
      friend: new FormControl(false, { nonNullable: true }),
      linkedin: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    }),
    // Single boolean Checkbox (Required)
    terms: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
  });

  // Helper getters for validation in template
  get emailControl() {
    return this.form.controls.email;
  }

  get passwordsGroup() {
    return this.form.controls.passwords;
  }

  get passwordControl() {
    return this.form.controls.passwords.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.passwords.controls.confirmPassword;
  }

  get firstNameControl() {
    return this.form.controls.firstName;
  }

  get lastNameControl() {
    return this.form.controls.lastName;
  }

  get streetControl() {
    return this.form.controls.address.controls.street;
  }

  get numberControl() {
    return this.form.controls.address.controls.number;
  }

  get postalCodeControl() {
    return this.form.controls.address.controls.postalCode;
  }

  get cityControl() {
    return this.form.controls.address.controls.city;
  }

  get termsControl() {
    return this.form.controls.terms;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Reactive Signup Form Submitted:', this.form.getRawValue());
    this.submittedData.set(this.form.getRawValue());
  }

  onReset(): void {
    this.form.reset({
      email: '',
      passwords: { password: '', confirmPassword: '' },
      firstName: '',
      lastName: '',
      address: { street: '', number: '', postalCode: '', city: '' },
      role: 'student',
      accountType: 'personal',
      billingCycle: 'monthly',
      source: { google: false, friend: false, linkedin: false, other: false },
      terms: false,
    });
    this.submittedData.set(null);
  }
}
