import { categories } from './dataArrays'

export const fields = [
  { id: 1, name: 'images', type: 'file', defaultCase: true },
  { id: 2, name: 'name', type: 'text', defaultCase: '' },
  { id: 3, name: 'price', type: 'number', defaultCase: 0 },
  {
    id: 4,
    name: 'category',
    type: 'select',
    defaultCase: '',
    options: categories,
  },
  { id: 5, name: 'tags', type: 'text', defaultCase: '' },
  { id: 6, name: 'onSale', type: 'boolean', defaultCase: false },
  { id: 7, name: 'specialOffer', type: 'boolean', defaultCase: false },
  {
    id: 8,
    name: 'percentageOff',
    type: 'select',
    defaultCase: 0,
    options: [0, 10, 20, 25, 50, 80],
  },
  { id: 9, name: 'suspend', type: 'boolean', defaultCase: false },
  {
    id: 10,
    name: 'itemsInStock',
    type: 'select',
    defaultCase: 0,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  { id: 11, name: 'inStock', type: 'boolean', defaultCase: true },
  { id: 12, name: 'featured', type: 'boolean', defaultCase: true },
  { id: 13, name: 'popular', type: 'boolean', defaultCase: true },
  { id: 14, name: 'new', type: 'boolean', defaultCase: true },
  { id: 15, name: 'description', type: 'text', defaultCase: '' },
  { id: 16, name: 'detailedDescription', type: 'textarea', defaultCase: '' },

  // [
  //   { id: 17, name: 'bullet_1', type: 'text', defaultCase: 'add text' },
  //   { id: 18, name: 'bullet_2', type: 'text', defaultCase: 'add text' },
  // ],
]
