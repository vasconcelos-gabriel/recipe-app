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
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      onClick={handleDetailsClick}
      >Ingredientes e Modo de Preparo</button>
      </div>
    </div>
  )
}

export default RecipeCard
