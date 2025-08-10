import { INITIAL_STATE_ACTION } from "./general-constant"

export const HEADER_TABLE_ORDER = [
  "No",
  "ID",
  "Customer Name",
  "Table",
  "Status",
  "Action"
]

export const INITIAL_ORDER = {
  customer_name: "",
  table_id: "",
  status: "",
}

export const INITIAL_STATE_ORDER = {
  status: "idle",
  errors: {
    customer_name: [],
    table_id: [],
    status: [],
    _form: [],
  },
}

export const STATUS_ORDER_LIST = [
  {
    value: 'reserved',
    label: 'Reserved'
  },
  {
    value: 'process',
    label: 'Process'
  },
]

export const HEADER_TABLE_DETAIL_ORDER = [
  "No",
  "Menu",
  "Total",
  "Status",
  "Action"
]

export const FILTER_MENU = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 'breakfast',
    label: 'Breakfast'
  },
  {
    value: 'drinks',
    label: 'Drinks'
  },
  {
    value: 'beverages',
    label: 'Beverages'
  },
  {
    value: 'desserts',
    label: 'Desserts'
  },
]

export const INITIAL_STATE_GENERATE_PAYMENT = {
  ...INITIAL_STATE_ACTION,
  data: {
    payment_token: ''
  }
}