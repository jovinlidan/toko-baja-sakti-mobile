import { Expose, Type } from "class-transformer";

export enum FilterType {
  Text = "text",
  Number = "number",
  Option = "option",
  Date = "date",
}

export enum FilterBehaviour {
  Exact = "exact",
  Partial = "partial",
  Range = "range",
  Single = "single",
  Multiple = "multiple",
  Before = "before",
  After = "after",
}

export class Option {
  label: string;
  value: string;
}

export class Filter {
  name: string;
  label?: string;
  type?: string;
  default?: string;

  @Type(() => Option)
  options?: Option[];

  behaviour?: FilterBehaviour;
  value?: string;
}
export class Sort {
  @Type(() => String)
  options: string[];
  default: string;
  value?: string;
}

export class CustomSortOptions {
  label: string;
  value: string;
  icon?: string;
}

export class CustomSort {
  @Type(() => CustomSortOptions)
  options: CustomSortOptions[];
  default: string;
  value?: string;
}

export class PaginationMeta {
  @Expose({ name: "current_page" })
  currentPage: number;
  from: number;

  @Expose({ name: "last_page" })
  lastPage: number;
  path: string;

  @Expose({ name: "per_page" })
  perPage: number;
  to: number;
  total: number;
}

export interface getEnumsInput {
  class: string;
}

export interface EnumResult {
  label: string;
  value: string;
}

export class MessageResult {
  message: string;
}
