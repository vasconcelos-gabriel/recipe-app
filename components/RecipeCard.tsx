import { Recipe } from '@/pages/recipe'
import { useRouter } from 'next/router'

type RecipeCardProps = {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const router = useRouter()

  const handleDetailsClick = () => {
    router.push(`/recipe/${recipe.id}`)
  }
  
  return (
    <div
      className="bg-white shadow-md rounded-lg mb-4 mt-4 relative"
      key={recipe.id}
    >
      <h2 className="h-24 flex items-center justify-center text-black mt-6 ml-7 text-2xl font-bold">
        {recipe.title}
      </h2>
      <hr className="mt-4 mb-8 border-2" />
      <div className="flex justify-center items-center h-64">
        <img
          className="h-full w-full image shadow-md"
          src={recipe.image}
          alt={recipe.title}
        />
      </div>
      <div className="flex justify-center items-center mt-6">
      <button type="button" className="text-white mb-4 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleDetailsClick}
      >Ingredients and how to prepare</button>
      </div>
    </div>
  )
}

export default RecipeCard
