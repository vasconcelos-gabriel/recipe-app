import { useRouter } from 'next/router'
import { Recipe } from '@/pages/recipe'

interface RecipeDetailsProps {
  recipe: Recipe
  ingredients: string[]
  preparation: string[]
}


const recipeInfo = () => {
  return (
    <div>recipeInfo</div>
  )
}

export default recipeInfo