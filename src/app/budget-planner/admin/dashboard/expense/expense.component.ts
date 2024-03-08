import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';import { Router, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ MatToolbarModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,MatButtonModule,RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
 incomeForm: any;
  selectedMonth: any;
  januaryIncomes: any[] = [
    { source: 'Rent', amount: 500,  },
    { source: 'Grocery', amount: 100,  },
  ];
  februaryIncomes: any[] = [
    { source: 'Rent', amount: 500, },
    { source: 'Essential', amount: 1040,},
  ];
  marchIncomes: any[] = [
    { source: 'Rent', amount: 500,  },
    { source: 'Grocery', amount: 120,  },
    { source: 'Essential', amount: 600,  },
  ];
 
  
  constructor(private fb: FormBuilder, private router: Router,private cdr: ChangeDetectorRef) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }
  
  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
     
    });
  }
  
  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.februaryIncomes.push(newIncome);
          break;
        case 'March':
          this.marchIncomes.push(newIncome);
          break;
        default:
          break;
      }
      
      this.incomeForm.reset(); this.cdr.detectChanges();
     this.incomeForm.patchValue({ month: '',source: '', amount:'',investments:''});
      
    }
  }
  
  onChange(event: any) {
    this.selectedMonth = event.value;
    console.log('Selected month:', event.value);
    console.log('Selected Month:', this.selectedMonth);
    this.getFilteredIncomes();
  }
  
  getFilteredIncomes() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }
  
  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }
  
  getIncomesForMonth(month: string) {
    switch (month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }
  
  incomeSummary: any[] = [
    { month: 'January', totalIncome: 5000 },
    { month: 'February', totalIncome: 6000 },
    { month: 'March', totalIncome: 5500 }
    // Add more entries as needed
  ];
  
  saveForm() {
    console.log("Form Saved");
  }
  
  onBack() {
    this.router.navigate(['home/dashboard']);
  }
}