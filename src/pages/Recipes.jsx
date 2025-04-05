import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/recipes/Combobox";
import Combobox_ing from "@/components/recipes/Combobox_ing";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createRecipes, readRecipes } from "@/api/recipes";
import useCafeStore from "@/store/cafe-store";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const Recipes = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const token = useCafeStore((s) => s.token);
  const [recipeData, setRecipeData] = useState([]);

  const products = useCafeStore((s) => s.products);
  const ingredients = useCafeStore((s) => s.ing);

  const selectedProductId = watch("product");
  const selectedProduct = products.find((p) => p.pd_id == selectedProductId);
  const productName = selectedProduct
    ? selectedProduct.pd_name
    : "No product selected";

  const selectedIngredientId = watch("ingredient");
  const selectedIngredient = ingredients.find(
    (item) => item.ing_id == selectedIngredientId
  );
  const ingredientName = selectedIngredient
    ? selectedIngredient.ing_name
    : "No ingredient selected";
  const unitName = selectedIngredient
    ? selectedIngredient.unit.unit_name
    : "No unit selected";

  const onSubmit = (data) => {
    if (!selectedIngredientId) {
      Swal.fire("Please select an ingredient", "", "warning");
      return;
    }

    const isDuplicate = recipeData.some(
      (item) => item.ing_id == selectedIngredientId
    );

    if (isDuplicate) {
      Swal.fire("This ingredient is already added!", "", "warning");
      return;
    }
    setRecipeData((prevData) => [
      ...prevData,
      {
        pd_id: selectedProductId,
        ing_id: selectedIngredientId,
        ingredient: { ing_name: ingredientName, unit: { unit_name: unitName } },
        used: data.used,
      },
    ]);

    setValue("ingredient", "");
    setValue("used", "");
  };

  useEffect(() => {
    if (selectedProductId) {
      readRecipes(token, selectedProductId)
        .then((res) => {
          setRecipeData(res.data || []);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedProductId]);

  const handleSave = async () => {
    if (!recipeData.length) return;

    try {
      const res = await createRecipes(token, recipeData);
      Swal.fire(res.data.success, "", "success");
      setRecipeData([]);
      reset();
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };

  const handleDelete = (index) => {
    setRecipeData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl my-2">Recipes</h1>
      <div className="flex w-[875px] my-4 border rounded-lg h-max p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col border-r-2 pr-2 py-2 gap-3">
            <Combobox form={{ setValue, watch }} />
            <Combobox_ing form={{ setValue, watch }} />
            <Input
              id="used"
              placeholder="Quantity used"
              className="col-span-3"
              type="number"
              {...register("used", { required: true, min: 0.01 })}
            />
            <Button type="submit" variant="sky">
              Add
            </Button>
          </div>
        </form>
        <div className="p-2 grow relative">
          <p>
            {selectedProductId
              ? `Product : ${productName}`
              : "No product selected"}
          </p>
          <ul className="list-disc ml-5">
            {recipeData.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 gap-5 my-2"
              >
                <span>
                  {item.ingredient.ing_name} : {item.used}{" "}
                  {item.ingredient.unit.unit_name}
                </span>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  size={17}
                  onClick={() => handleDelete(index)}
                />
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 right-0">
            <Button
              variant="success"
              disabled={!recipeData.length}
              onClick={handleSave}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
