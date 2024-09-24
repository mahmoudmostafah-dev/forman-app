import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyErrorStateMatcher } from '../../util/My-error-state-mtcher';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    InputErrorComponent,
  ],
})
export class InputFieldComponent implements OnInit {
  show = false;
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() type: string = 'text';
  @Input() suffix: string = '';
  @Input() prefix: string = '';
  @Input() isDisabled: boolean = false;
  @Input() imageCode: string = '';
  @Input() dataTestId: string = '';

  @Input() controlF: FormControl | AbstractControl<any, any> | any =
    new FormControl();

  @Input() validators: ValidatorFn[] | null = null;
  @Input() isRequired?: boolean;
  @Input() min?: number;
  @Input() max?: number;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() startsWith?: string;
  @Input() isReadOnly: boolean = false;

  @Output() inputChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputClickEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output() errorChange: EventEmitter<string> = new EventEmitter<string>();
  matcher = new MyErrorStateMatcher();

  showPassword: boolean = false;
  isEnglish: boolean = true;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.isEnglish = this.translateService.currentLang === 'en';

    this.isValidCode(this.imageCode);

    if (this.isRequired == undefined) {
      this.isRequired = this.isRequiredCheck();
    }

    this.updateValidators();
  }

  isValidCode(result: any) {
    const imageCodeValue = this.controlF?.value;
    const isImageCodeTouched = this.controlF?.touched;
    if (
      result !== imageCodeValue &&
      result.length > 3 &&
      imageCodeValue !== null &&
      imageCodeValue.length !== 0
    ) {
      return true;
    }
    if (this.controlF?.value == null || this.controlF?.value.length == 0) {
      return false;
    }
    return false;
  }

  togglePasswordVisibility() {
    this.show = !this.show;
  }

  inputChange(event: any) {
    this.inputChangeEvent.emit(event);
  }

  inputClick(event: any) {
    this.inputClickEvent.emit(event);
  }

  private updateValidators() {
    const validators = [];

    if (this.isRequired) {
      validators.push(Validators.required);
    }

    if (this.isDisabled) {
      this.controlF.disable();
    }

    if (this.type === 'text' || this.type === 'password') {
      if (this.maxLength !== undefined) {
        validators.push(Validators.maxLength(this.maxLength));
      }
      if (this.minLength !== undefined) {
        validators.push(Validators.minLength(this.minLength));
      }
    } else if (this.type === 'number') {
      validators.push(Validators.pattern('^-?\\d*\\.?\\d+$'));

      if (this.max !== undefined) {
        validators.push(Validators.max(this.max));
      }
      if (this.min !== undefined) {
        validators.push(Validators.min(this.min));
      }
    } else if (this.type === 'email') {
      validators.push(Validators.email);
    }
    if (this.startsWith) {
      validators.push(this.startsWithValidator(this.startsWith));
    }

    this.controlF.setValidators(validators);
    this.controlF.updateValueAndValidity();
  }

  private startsWithValidator(prefix: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // don't validate empty values to allow optional controls
      }
      const valid = control.value.toString().startsWith(prefix);
      return valid ? null : { startsWith: { value: control.value } };
    };
  }

  isRequiredCheck() {
    return this.controlF.validator
      ? !!this.controlF.validator(this.controlF)
      : false;
  }
}
