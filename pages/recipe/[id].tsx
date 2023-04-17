import { useRouter } from 'next/router'
import RecipeDetails from '@/components/RecipeDetails'

const RecipePage = () => {
  const router = useRouter()
  const { id } = router.query

  return <RecipeDetails id={Number(id)} />
}

export default RecipePage