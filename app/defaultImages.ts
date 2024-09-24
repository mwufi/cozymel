
const library = [
  {
    id: 1,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_0.png'
  },
  {
    id: 2,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_1.png'
  },
  {
    id: 3,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_2.png'
  },

  {
    id: 4,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_3.png'
  }
]

const defaultElements = [
  { type: 'postcard', id: Date.now(), x: 100, y: 100 },
  { type: 'image', id: Date.now() + 1, x: 200, y: 200, image: library[0].image },
  { type: 'image', id: Date.now() + 2, x: 300, y: 300, image: library[1].image },
  { type: 'image', id: Date.now() + 3, x: 400, y: 400, image: library[2].image },
  { type: 'image', id: Date.now() + 4, x: 500, y: 500, image: library[3].image }
]

export { library, defaultElements };
