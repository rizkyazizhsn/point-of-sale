export const HEADER_TABLE_MENU = [
  "No",
  "Name",
  "Category",
  "Price",
  "Available",
  "Action",
];

export const CATEGORY_LIST = [
  {
    label: "Beverages",
    value: "beverages",
  },
  {
    label: "Drinks",
    value: "drinks",
  },
  {
    label: "Breakfast",
    value: "breakfast",
  },
  {
    label: "Desserts",
    value: "desserts",
  },
];

export const AVAILABILITY_LIST = [
  {
    label: "Available",
    value: "true",
  },
  {
    label: "Not Available",
    value: "false",
  },
];

export const INITIAL_MENU = {
  name: "",
  description: "",
  price: "",
  discount: "",
  category: "",
  image_url: "",
  is_available: "",
};

export const INITIAL_STATE_MENU = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    description: [],
    price: [],
    discount: [],
    category: [],
    image_url: [],
    is_available: [],
    _form: [],
  },
};
