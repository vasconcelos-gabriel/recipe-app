import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type RecipeDetailsProps = {
  id: number;
};

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  extendedIngredients: {
    id: number;
    name: string;
    originalName: string;
    amount: number;
    unit: string;
  }[];
  instructions: string;
};

const RecipeDetails = ({ id }: RecipeDetailsProps) => {
  const [recipe, setRecipe] = useState<RecipeDetails>();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeDetails>(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: '28963d1283394038b69e0b5ea494dca6',
              includeNutrition: false,
              language: 'pt-BR',
            },
          }
        );
        const recipeWithImageURL = {
          ...response.data,
          image: response.data.image,
        };
        setRecipe(recipeWithImageURL);
      } catch (error) {
        console.error(error);
       
        router.push('/recipe');
      }
    };

    fetchRecipe();
  }, [id, router]);

  if (!recipe) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='flex flex-col items-center p-0 bg-zinc-300 relative w-screen h-screen'>
      <div className='bg-white w-[63.25rem] mt-4 rounded-md shadow-xl'>
      <div className='bg-blue-300 flex h-72'>
      <h1 className='text-black w-1/2 flex items-end font-bold ml-[3.75rem] mb-8 leading-[3.438rem] text-6xl'>{recipe.title}</h1>
      <img className='w-1/2' src={recipe.image} alt={recipe.title} />
      </div>
      <h2 className='text-black mt-7 ml-4 font-bold text-3xl '>Ingredients:</h2>
    
      <ul className="mt-4 grid grid-cols-2 gap-4 list-disc list-inside items-start ml-8">
        {recipe.extendedIngredients.map((ingredient) => (
          <li className='text-black' key={ingredient.id}>
             {ingredient.amount} {ingredient.unit} -   {ingredient.originalName}
          </li>
        ))}
      </ul>
          
      <h2 className='text-black mt-7 ml-4 font-bold text-3xl '>How to prepare:</h2>
      <div className='text-black ml-8 mr-8 mt-4 mb-4 text-left' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
    </div>
  );
};


export default RecipeDetails;