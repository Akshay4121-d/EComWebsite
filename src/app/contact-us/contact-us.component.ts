import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

export interface Transaction {
  transactionType: string;
  accountType: string;
  statementPeriod: string;
  accountNumber: string;
  amount: number;
  category: string;
  transactionStatus: string;
  description: string;
  is_income_bucket: boolean
  flagStatus: any;
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule, DropdownModule, DropDownsModule, TooltipModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [DatePipe]
})
export class ContactUsComponent implements OnInit {

  @ViewChild('descriptionInput') descriptionInput!: ElementRef;
  @ViewChild('minInput') minInput!: ElementRef;
  @ViewChild('maxInput') maxInput!: ElementRef;
  transactions: Transaction[] = [
    {
      transactionType: 'LD', accountType: 'All Accounts', statementPeriod: '2023-04-01T00:00:00', accountNumber: 'Ranet Flog', amount: 1000258, category: 'Personal', description: 'Salary payment for August', transactionStatus: 'Include', is_income_bucket: true,
      flagStatus: 'NSF/OD'
    },
    {
      transactionType: '', accountType: 'Checking Account', statementPeriod: '2023-02-01T00:00:00', accountNumber: 'DepotAcc01', amount: 150000, category: 'Business', description: 'Office supplies purchase', transactionStatus: 'Exclude', is_income_bucket: false,
      flagStatus: 'NSF/OD'
    },
    {
      transactionType: '', accountType: 'Saving Account', statementPeriod: '2023-03-01T00:00:00', accountNumber: 'Account123', amount: 5000, category: 'Sbad Treas', description: 'Investment in mutual funds', transactionStatus: 'Exclude', is_income_bucket: true,
      flagStatus: ''
    },
    {
      transactionType: 'LD', accountType: 'All Accounts', statementPeriod: '2022-01-01T00:00:00', accountNumber: 'Account456', amount: 2000, category: 'Sbad Treas', description: 'Rent payment', transactionStatus: 'Exclude', is_income_bucket: false,
      flagStatus: ''
    },
    {
      transactionType: 'OverDraft', accountType: 'All Accounts', statementPeriod: '2022-06-01T00:00:00', accountNumber: '123456789012345', amount: 7500, category: 'SBA Loan', description: 'Gift to family', transactionStatus: 'Exclude', is_income_bucket: true,
      flagStatus: 'NSF/OD'
    },
    {
      transactionType: 'Small Deposit', accountType: 'Checking Account', statementPeriod: '2024-06-01T00:00:00', accountNumber: '098877364357668', amount: 3000, category: 'FundBox', description: 'Payment for utilities', transactionStatus: 'Exclude', is_income_bucket: true,
      flagStatus: ''
    }
  ];

  transactionTypes = [
    { id: 1, code: 'SD', name: 'Withdraw' },
    { id: 2, code: 'OD', name: 'Deposit' }
  ];
  accountTypes = [
    { id: 1, code: 'All', name: 'All Accounts' },
    { id: 2, code: 'Checking', name: 'Checking Account' },
    { id: 3, code: 'Saving', name: 'Saving Account' }
  ];

  categories = [
    { id: '0', value: 'UI Benifit' },
    { id: '1', value: 'Sbad Treas' },
    { id: '2', value: 'FundBox' },
    { id: '3', value: 'SBA Loan' },
  ];

  statementPeriods = [
    { id: '0', value: 'April 2023' },
    { id: '1', value: 'February 2023' },
    { id: '2', value: 'March 2023' },
    { id: '3', value: 'January 2024' }
  ];

  flagStatusOptions = [
    { label: 'NSF/OD', value: 'NSF/OD' },
    { label: '', value: '' }
  ];

  accountNumbers = [
    { accountNumber: '098877364357668', name: 'Account 2', bankName: 'Bank Of America', accountType: 'Saving Account' },
    { accountNumber: '123456789012345', name: 'Account 3', bankName: 'Chase Bank', accountType: 'Checking Account' },
    { accountNumber: '234567890123456', name: 'Account 4', bankName: 'Wells Fargo', accountType: 'Saving Account' },
    { accountNumber: '345678901234567', name: 'Account 5', bankName: 'Citibank', accountType: 'Checking Account' }
  ];

  largeDeposits = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
  ];

  transactionStatus = [
    { id: 1, name: 'Include' },
    { id: 2, name: 'Exclude' },
  ];

  minAmount: number | null = null;
  maxAmount: number | null = null;
  miniAmount = new FormControl('', [Validators.min(0), Validators.max(1000000000)]);
  maxiAmount = new FormControl('', [Validators.min(0), Validators.max(1000000000)]);

  selectedTransactionTypes: string[] = [];
  selectedAccountType: string[] = [];
  selectedStatementPeriod: string[] = [];
  selectedAccountNumber: string[] = [];
  selectedCategory: string[] = [];
  selectedLargeDeposit: string[] = [];
  selectedTransactionStatus: string[] = [];
  selectedFlagStatus: string[] = [];
  searchDescription = '';
  bankNames: any[] = [];
  accountHolderNames: any[] = [];

  selectedBankNames: string[] = [];
  selectedAccountHolderNames: string[] = [];


  filteredTransactions: Transaction[] = this.transactions;
  appliedFilterCount: number = 0;
  isDescriptionFilterApplied: boolean = false;
  hasAppliedFilters: boolean = false;


  constructor(private datePipe: DatePipe) {
    // Populate distinct bank names and account holder names
    let bankNames = this.accountNumbers.map((e: any) => e.bankName);
    let AccHoldernames = this.accountNumbers.map((e: any) => e.name);
    this.bankNames = Object.keys(bankNames).map((e: any) => ({ id: e, value: bankNames[e] }));
    this.accountHolderNames = Object.keys(AccHoldernames).map((e: any) => ({ id: e, value: AccHoldernames[e] }))
    // let disposeDs = Object.keys(parentData.data.autoDispoStatus).map((e: any) => ({ id: e, value: parentData.data.autoDispoStatus[e] }));

  }
  ngOnInit(): void {
    this.transactions.forEach(transaction => {
      if (transaction.transactionType === 'LD') {
        transaction.flagStatus = 'NSF/OD';
      } else {
        transaction.flagStatus = '';
      }
    });
  }
  filterData(event?: any) {
    if (!this.isDescriptionFilterApplied) {
      this.filteredTransactions = this.transactions.slice();
    }

    if (this.selectedTransactionTypes.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedTransactionTypes.includes(transaction.transactionType)
      );
    }

    if (this.selectedAccountType.length > 0 && !this.selectedAccountType.includes('All')) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedAccountType.includes(transaction.accountType)
      );
    }

    if (this.selectedStatementPeriod.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction => {
        const formattedDate: any = this.datePipe.transform(transaction.statementPeriod, 'MMMM YYYY');
        return this.selectedStatementPeriod.includes(formattedDate);
      });
    }

    if (this.selectedAccountNumber.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedAccountNumber.includes(transaction.accountNumber)
      );
    }

    if (this.selectedCategory.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedCategory.includes(transaction.category)
      );
    }

    if (this.selectedTransactionStatus.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedTransactionStatus.includes(transaction.transactionStatus)
      );
    }

    if (this.selectedLargeDeposit.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction => {
        const isLargeDeposit = transaction.transactionType === 'LD' ? 'Yes' : 'No';
        return this.selectedLargeDeposit.includes(isLargeDeposit);
      });
    }
    debugger
    if (this.minAmount !== null || this.maxAmount !== null) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction => {
        const amount = transaction.amount;
        return (!this.minAmount || amount >= this.minAmount) &&
          (!this.maxAmount || amount <= this.maxAmount);
      });
    }

    if (event?.key === 'Backspace' && this.searchDescription.length === 1) {
      this.isDescriptionFilterApplied = false;
      this.searchDescription = '';
      this.filteredTransactions = this.transactions.slice();
      this.filterData();
      return;
    }

    if (event?.key === 'Enter' && this.searchDescription.trim()) {
      this.isDescriptionFilterApplied = true;
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        transaction.description.toLowerCase().includes(this.searchDescription.toLowerCase())
      );
      if (this.descriptionInput) {
        this.descriptionInput.nativeElement.blur();
      }
    }

    if (this.selectedBankNames.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedBankNames.some(bankName =>
          this.accountNumbers.some(account =>
            account.bankName === bankName && account.accountNumber === transaction.accountNumber
          )
        )
      );
    }

    if (this.selectedAccountHolderNames.length > 0) {
      this.filteredTransactions = this.filteredTransactions.filter(transaction =>
        this.selectedAccountHolderNames.some(accountHolderName =>
          this.accountNumbers.some(account =>
            account.name === accountHolderName && account.accountNumber === transaction.accountNumber
          )
        )
      );
    }

    this.hasAppliedFilters = !!this.getAppliedFilters().length;
  }


  getAppliedFilters() {
    return [
      { label: 'Transaction Type', values: this.selectedTransactionTypes },
      { label: 'Account Type', values: this.selectedAccountType },
      { label: 'Statement Period', values: this.selectedStatementPeriod },
      { label: 'Account Number', values: this.selectedAccountNumber },
      { label: 'Category', values: this.selectedCategory },
      { label: 'Large Deposit', values: this.selectedLargeDeposit },
      { label: 'Transaction Status', values: this.selectedTransactionStatus },
      { label: 'Description', values: this.isDescriptionFilterApplied ? [this.searchDescription] : [] },
      { 
        label: 'Amount', 
        values: this.minAmount !== null || this.maxAmount !== null ? 
                  [`${this.minAmount !== null ? this.minAmount : 0} - ${this.maxAmount !== null ? this.maxAmount : 'max'}`] 
                  : [] 
      },
      { label: 'Bank Name', values: this.selectedBankNames },
      { label: 'Account Holder Name', values: this.selectedAccountHolderNames }
    ].filter(filter => filter.values.length > 0);
  }
  

  removeFilter(filter: { label: string; value: string }) {
    const removeValueFromArray = (array: string[], value: string) => array.filter(item => item !== value);
  
    switch (filter.label) {
      case 'Transaction Type':
        this.selectedTransactionTypes = removeValueFromArray(this.selectedTransactionTypes, filter.value);
        break;
      case 'Account Type':
        this.selectedAccountType = removeValueFromArray(this.selectedAccountType, filter.value);
        break;
      case 'Statement Period':
        this.selectedStatementPeriod = removeValueFromArray(this.selectedStatementPeriod, filter.value);
        break;
      case 'Account Number':
        this.selectedAccountNumber = removeValueFromArray(this.selectedAccountNumber, filter.value);
        break;
      case 'Category':
        this.selectedCategory = removeValueFromArray(this.selectedCategory, filter.value);
        break;
      case 'Description':
        this.searchDescription = '';
        this.isDescriptionFilterApplied = false; // Reset the flag when the description filter is removed
        break;
      case 'Large Deposit':
        this.selectedLargeDeposit = removeValueFromArray(this.selectedLargeDeposit, filter.value);
        break;
      case 'Transaction Status':
        this.selectedTransactionStatus = removeValueFromArray(this.selectedTransactionStatus, filter.value);
        break;
      case 'Bank Name':
        this.selectedBankNames = removeValueFromArray(this.selectedBankNames, filter.value);
        break;
      case 'Account Holder Name':
        this.selectedAccountHolderNames = removeValueFromArray(this.selectedAccountHolderNames, filter.value);
        break;
      case 'Amount':
        if (filter.value.includes('-')) {
          const [min, max] = filter.value.split('-').map(val => val.trim());
  
          if (min !== '0') {
            this.minAmount = null; // Reset min amount
          }
  
          if (max !== 'max') {
            this.maxAmount = null; // Reset max amount
          }
        }
        break;
    }
  
    this.filterData();
  }
  

  numberOnly(event: KeyboardEvent): void {
    if (/^[0-9]$/.test(event.key) || ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Tab', 'Delete', 'Control'].includes(event.key)) {
      return;
    }
    event.preventDefault();
  }

  validateNoSpecialChars(event: KeyboardEvent) {
    // Allow certain special keys like Backspace, Tab, Arrow keys, Enter, and Delete
    const validKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter', 'Delete'];

    if (validKeys.includes(event.key)) {
      return; // Allow special keys
    }

    // Convert the key code to the actual character
    const input = event.key;

    // Pattern to allow only alphabetic characters, numbers, and spaces
    const pattern = /^[a-zA-Z0-9\s]$/;

    // Check if the input character matches the pattern
    if (!pattern.test(input)) {
      event.preventDefault(); // Prevent default action for invalid characters
    }
  }


  validateOnlyCharacter(event: KeyboardEvent) {
    const input = String.fromCharCode(event.charCode);
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  validateAmount(event: Event, type: 'min' | 'max') {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);

    // Update the range to be between 0 and 10 crores (0 to 100,000,000)
    const maxAllowed = 100000000; // 10 crores

    if (value > maxAllowed) {
      value = maxAllowed;
    } else if (value < 0) {
      value = 0;
    }

    input.value = value.toString();

    if (type === 'min') {
      this.minAmount = value;
    } else {
      this.maxAmount = value;
    }

    this.filterData();
  }

  clearFilters() {
    this.selectedTransactionTypes = [];
    this.selectedAccountType = [];
    this.selectedStatementPeriod = [];
    this.selectedAccountNumber = [];
    this.selectedCategory = [];
    this.selectedLargeDeposit = [];
    this.selectedTransactionStatus = [];
    this.searchDescription = '';
    this.isDescriptionFilterApplied = false;
    this.minAmount = null;
    this.maxAmount = null;
    this.selectedBankNames = [];
    this.selectedAccountHolderNames = [];
    this.filterData();
  }

  clearFilter(filterInput: HTMLInputElement) {
    filterInput.value = '';
    filterInput.dispatchEvent(new Event('input'));
    this.filterData();
  }

  onFilterInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;

    // You can add additional filtering logic here if needed
    this.filterData();  // Call the filter method to refresh the list
  }
}
