interface CategoryOption {
  label: string;
  value: number;
  children?: CategoryOption[];
}

export interface ICategoryRes {
  options: CategoryOption[];
}
