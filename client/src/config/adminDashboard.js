export const addProductFormElements = [
    {
        label: 'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter product title',
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter product description',
    },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            { id: 'dogs', label: 'Dogs' },
            { id: 'cats', label: 'Cats' },
            { id: 'birds', label: 'Birds' },
            { id: 'fish&aquatic', label: 'Fish & Aquatic' },
            { id: 'toys', label: 'Toys & Accessories' },
            { id: 'grooming', label: 'Grooming Products' },
            { id: 'health', label: 'Health & Wellness' },
            { id: 'beds&cages', label: 'Beds & Cages' },
        ],
    },
    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            { id: 'pedigree', label: 'Pedigree' },
            { id: 'whiskas', label: 'Whiskas' },
            { id: 'active', label: 'Active' },
            { id: 'royal-canin', label: 'Royal Canin' },
            { id: 'himalaya', label: 'Himalaya Pets' },
            { id: 'purepet', label: 'Purepet' },
            { id: "others", label: "Others" },
        ],
    },
    {
        label: 'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter product price',
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter sale price (optional)',
    },
    {
        label: 'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter total stock',
    },
];
