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
            apiKey: '28963d1283394038b69e0b5ea494dca6',
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
      <div className="relative mt-4 mr-7 ml-7">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="recipeId"
          onChange={handleSearchTermChange}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Recipes, ingredients..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipePage
