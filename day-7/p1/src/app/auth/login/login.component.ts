import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  submittedData = signal<{ email: string; remember: boolean } | null>(null);

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      // Mark all controls as touched to display validation errors
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const { email, remember } = form.value;
    this.submittedData.set({
      email,
      remember: Boolean(remember),
    });

    console.log('Template-Driven Login Submitted:', form.value);

    // Reset the form controls
    form.resetForm({
      remember: false,
    });
  }

  onReset(form: NgForm): void {
    form.resetForm({ remember: false });
    this.submittedData.set(null);
  }
}
