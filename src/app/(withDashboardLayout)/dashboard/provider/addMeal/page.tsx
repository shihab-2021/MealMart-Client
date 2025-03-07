"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useAddMealMutation } from "@/redux/features/meal/mealApi";

interface IIngredient {
  ingredientName: string;
  description: string;
}

export interface IMeal {
  mealName: string;
  description: string;
  price: number;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  category: string;
  allIngredients: string;
  keyIngredients: IIngredient[];
  howToPrep: string[];
  images: File[];
}

export default function CreateMealForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IMeal>();
  const [addMeal, { isLoading }] = useAddMealMutation();

  const [images, setImages] = useState<File[]>([]);
  const [keyIngredients, setKeyIngredients] = useState([
    { ingredientName: "", description: "" },
  ]);
  const [prepSteps, setPrepSteps] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    "Smoothies",
    "Breakfast Bowls",
    "Pasta",
    "Harvest Bowls",
    "Grains",
    "Soups",
    "Snacks",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", [...images, ...files]);
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addKeyIngredient = () => {
    setKeyIngredients([
      ...keyIngredients,
      { ingredientName: "", description: "" },
    ]);
  };

  const removeKeyIngredient = (index: number) => {
    setKeyIngredients(keyIngredients.filter((_, i) => i !== index));
  };

  const addPrepStep = () => {
    setPrepSteps([...prepSteps, ""]);
  };

  const removePrepStep = (index: number) => {
    setPrepSteps(prepSteps.filter((_, i) => i !== index));
  };

  const handleImagesUpload = async (): Promise<string[]> => {
    if (!images.length) return [];

    try {
      const uploadPromises = images.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
        );

        const res = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URI as string,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        return result.secure_url;
      });

      return await Promise.all(uploadPromises);
    } catch (error: any) {
      toast.error("Failed to upload images");
      return [];
    }
  };

  const onSubmit = async (data: IMeal) => {
    setIsSubmitting(true);
    if (images.length < 1) {
      toast.error("Please provide meal image!");
    }
    try {
      const imageUrls = await handleImagesUpload();
      const newMealData = {
        ...data,
        keyIngredients,
        prepSteps,
        images: imageUrls,
      };

      // Add your API call here
      const res = await addMeal(newMealData).unwrap();
      if (res.success) {
        toast.success("Meal created successfully!");
      }
      reset();
      setImages([]);
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mb-10">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Meal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mealName">Meal Name *</Label>
                <Input
                  id="mealName"
                  {...register("mealName", {
                    required: "Meal name is required",
                  })}
                />
                {errors.mealName && (
                  <p className="text-sm text-red-500">
                    {errors.mealName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0.01,
                      message: "Price must be greater than 0",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="h-24"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Nutritional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Nutritional Information *
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    {...register(`nutritionalInfo.calories`, {
                      required: `Calories is required`,
                      min: 0,
                    })}
                  />
                  {errors?.nutritionalInfo?.calories && (
                    <p className="text-sm text-red-500">
                      {errors?.nutritionalInfo?.calories.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein</Label>
                  <Input
                    id="protein"
                    type="number"
                    {...register(`nutritionalInfo.protein`, {
                      required: `Protein is required`,
                      min: 0,
                    })}
                  />
                  {errors?.nutritionalInfo?.protein && (
                    <p className="text-sm text-red-500">
                      {errors?.nutritionalInfo?.protein.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs</Label>
                  <Input
                    id="carbs"
                    type="number"
                    {...register(`nutritionalInfo.carbs`, {
                      required: `Carbs is required`,
                      min: 0,
                    })}
                  />
                  {errors?.nutritionalInfo?.carbs && (
                    <p className="text-sm text-red-500">
                      {errors?.nutritionalInfo?.carbs.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat</Label>
                  <Input
                    id="fat"
                    type="number"
                    {...register(`nutritionalInfo.fat`, {
                      required: `Fat is required`,
                      min: 0,
                    })}
                  />
                  {errors?.nutritionalInfo?.fat && (
                    <p className="text-sm text-red-500">
                      {errors?.nutritionalInfo?.fat.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Key Ingredients</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addKeyIngredient}
                >
                  <Plus className="mr-2" /> Add Ingredient
                </Button>
              </div>
              {keyIngredients.map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Input
                    required
                    placeholder="Ingredient name"
                    value={keyIngredients[index].ingredientName}
                    onChange={(e) => {
                      const newIngredients = [...keyIngredients];
                      newIngredients[index].ingredientName = e.target.value;
                      setKeyIngredients(newIngredients);
                    }}
                  />
                  <div className="flex gap-2">
                    <Input
                      required
                      placeholder="Description"
                      value={keyIngredients[index].description}
                      onChange={(e) => {
                        const newIngredients = [...keyIngredients];
                        newIngredients[index].description = e.target.value;
                        setKeyIngredients(newIngredients);
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeKeyIngredient(index)}
                      disabled={keyIngredients.length === 1}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Preparation Steps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Preparation Steps</h3>
                <Button type="button" variant="outline" onClick={addPrepStep}>
                  <Plus className="mr-2" /> Add Step
                </Button>
              </div>
              {prepSteps.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    required
                    placeholder={`Step ${index + 1}`}
                    value={prepSteps[index]}
                    onChange={(e) => {
                      const newSteps = [...prepSteps];
                      newSteps[index] = e.target.value;
                      setPrepSteps(newSteps);
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removePrepStep(index)}
                    disabled={prepSteps.length === 1}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Meal Images</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG (MAX. 5MB each)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    // {...register("images", {
                    //   required: "Meal image is required",
                    // })}
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="mt-4 relative group w-fit border rounded-lg p-1 flex"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Logo preview"
                      width={100}
                      height={100}
                      className="w-40 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Meal...
                </div>
              ) : (
                "Create Meal"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
