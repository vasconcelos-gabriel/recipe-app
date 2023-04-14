import { useState } from 'react'
import axios from 'axios'
import RecipeCard from '@/components/RecipeCard'

export type Recipe = {
  id: number
  title: string
  image: string
  extendedIngredients: {
    id: number
    name: string
    originalName: string
  }[]
}

const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = async () => {
    try {
      const response = await axios.get<{ results: Recipe[] }>(
        `https://api.spoonacular.com/recipes/search`,
        {
          params: {
            apiKey: '0aa85c86697345fdbbb993f20fc1d07a',
            query: searchTerm,
            language: 'pt-BR'
          }
        }
      )
      const recipesWithImageURL = response.data.results.map(recipe => ({
        ...recipe,
        image: `https://spoonacular.com/recipeImages/${recipe.image}`
      }))
      setRecipes(recipesWithImageURL)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1>Buscar Receita</h1>
      <label htmlFor="recipeId">ID da Receita:</label>
      <input
        className="text-black"
        type="text"
        id="recipeId"
        onChange={handleSearchTermChange}
      />
      <button onClick={handleSearch}>Buscar</button>

      <div className="grid grid-cols-4 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipePage
