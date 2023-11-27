export type CSSVariable = {
  name: string;
  type: string; // 'color', 'length', 'text', or 'picklist'
  placeholder?: string;
  defaultValue: string;
  unit?: string;
  options?: string[]; // For 'picklist' type
};
