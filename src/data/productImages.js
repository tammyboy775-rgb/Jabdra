const imageModules = import.meta.glob(
  '../assets/images/products/*',
  { eager: true, import: 'default' }
)

const imageUrls = {}
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split('/').pop()
  const baseName = filename.replace(/\.(jpg|jpeg|png)$/i, '')
  imageUrls[baseName] = url
}

const productNameToImageKey = {
  Banana: 'Banana',
  Beans: 'Beans',
  Cassava: 'Cassava',
  Catfish: 'Catfish',
  Crayfish: 'Crayfish',
  'Fresh Fish': 'Fresh-Fish',
  'Fresh Fruits': 'Fruits',
  Fruits: 'Fruits',
  'Garden Egg': 'Garden-Egg',
  Garri: 'Garri',
  Grains: 'Grains',
  Groundnuts: 'Groundnuts',
  Maize: 'Maize',
  Okra: 'Okra',
  Onions: 'Onions',
  'Palm Oil': 'Palm-Oil',
  Pepper: 'Pepper',
  Peppers: 'Pepper',
  Plantain: 'Plantain',
  Prawns: 'Prawns',
  Rice: 'Rice',
  Tilapia: 'Tilapia',
  Tomatoes: 'Tomatoes',
  Vegetables: 'Vegetables',
  Yam: 'Yam',
}

export const productImages = {}
for (const [productName, imageKey] of Object.entries(productNameToImageKey)) {
  if (imageUrls[imageKey]) {
    productImages[productName] = imageUrls[imageKey]
  }
}
