export interface Ingredient {
  _id: string
  name: string
}

export interface Recipe {
  _id: string
  name: string
  lastModified: string
  directions: string
  ingredients: Ingredient[]
}