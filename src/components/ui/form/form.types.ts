// form.types.ts
import type {
  Control, FieldErrors, FieldValues, Path,
  UseFormRegister, UseFormSetValue, UseFormWatch
} from 'react-hook-form';

export interface IField<T extends FieldValues = FieldValues> {
  labelText: string;
  registerName: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholderText?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
}

export interface IDateField<T extends FieldValues = FieldValues> {
  labelText: string;
  placeholderText?: string;
  name: Path<T>
  control?: Control<T>;
  errors?: FieldErrors<T>;
}

export interface IIconField<T extends FieldValues = FieldValues> {
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  fieldName: Path<T>;        
}

export interface IForm<T extends FieldValues = FieldValues> {
  formElement: Array<
    | { type: 'field'; props: IField<T> }
    | { type: 'date'; props: Omit<IDateField<T>, 'control' | 'errors'> }
    | { type: 'icon'; props: Pick<IIconField<T>, 'fieldName'> }  
  >;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  btnText?: string;
  btnClassName?: string;
  IconFields?: IIconField<T>;
  DateFields?: IDateField<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  control?: Control<T>;
  isPending?: boolean;
  isEmailVariant?: boolean;
}
