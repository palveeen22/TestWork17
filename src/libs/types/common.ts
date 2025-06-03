export interface ValidationError {
  field: string;
  message: string;
}

export interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}