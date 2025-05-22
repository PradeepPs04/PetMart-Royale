// menu bar on shop page
export const shoppingMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home',
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
        id: 'dogs',
        label: 'Dogs',
        path: '/shop/listing',
    },
    {
        id: 'cats',
        label: 'Cats',
        path: '/shop/listing',
    },
    {
        id: 'birds',
        label: 'Birds',
        path: '/shop/listing',
    },
    {
        id: 'toys',
        label: 'Toys',
        path: '/shop/listing',
    },
    {
        id: 'health',
        label: 'Health',
        path: '/shop/listing',
    },
    {
        id: 'search',
        label: 'Search',
        path: '/shop/search',
    },
];

// options to sort products
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// options to filer products
export const filterOptions = {
  category: [
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'birds', label: 'Birds' },
    { id: 'fish&aquatic', label: 'Fish & Aquatic' },
    { id: 'toys', label: 'Toys & Accessories' },
    { id: 'grooming', label: 'Grooming Products' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'beds&cages', label: 'Beds & Cages' },
  ],
  brand: [
    { id: "pedigree", label: "Pedigree" },
    { id: "whiskas", label: "Whiskas" },
    { id: "active", label: "Active" },
    { id: "royal-canin", label: "Royal Canin" },
    { id: "himalaya", label: "Himalaya Pets" },
    { id: "purepet", label: "Purepet" },
    { id: "others", label: "Others" },
  ],
};


// options for address form
export const addressFormControls = [
  {
    label: "Address",
    name: 'address',
    componentType: 'input',
    type: 'text',
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: 'city',
    componentType: 'input',
    type: 'text',
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: 'pincode',
    componentType: 'input',
    type: 'text',
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: 'phone',
    componentType: 'input',
    type: 'text',
    placeholder: "Enter your phone number",
  },
];