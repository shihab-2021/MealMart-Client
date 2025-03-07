import React from "react";
import whyImg1 from "@/assets/why-mealmart-icn1.png";
import whyImg2 from "@/assets/why-mealmart-icn2.png";
import whyImg3 from "@/assets/why-mealmart-icn3.png";
import whyImg4 from "@/assets/why-mealmart-icn4.png";
import Image from "next/image";

export default function WhyMealMart() {
  const infoData = [
    {
      image: whyImg1,
      title: "Plenty of protein",
      subTitle:
        "Quality protein matters in a meal delivery service, whether it's chicken, steak, fish, or plant-based.",
    },
    {
      image: whyImg2,
      title: "No commitment whatsoever",
      subTitle:
        "Skip weeks, pause, or cancel your meal kit subscription at any time.",
    },
    {
      image: whyImg3,
      title: "The most 5-star reviews among meal kit services",
      subTitle: "Our huge recipe selection wows week after week.",
    },
    {
      image: whyImg4,
      title: "Fresh and affordable meal delivery",
      subTitle: "Chef-created deliciousness that's cheaper than takeout.",
    },
  ];
  return (
    <div className="bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-3xl font-bold max-w-[650px] text-center mx-auto font-arima mt-10 pb-10">
          Why MealMart Meal Kits?
        </p>
        <div className="mx-auto max-w-[1300px] my-10">
          <div className="flex justify-between flex-wrap gap-6">
            {infoData?.map((info: any, index: number) => (
              <div className="flex flex-col gap-1 mx-auto" key={index}>
                <div className="flex-shrink p-1 mb-2">
                  <Image
                    src={info?.image}
                    className="max-w-[110px] mx-auto"
                    width={900}
                    height={900}
                    alt="info image"
                  />
                </div>
                <div className="max-w-[250px] text-center">
                  <h1 className="text-sm font-bold mb-1">{info.title}</h1>
                  <p className="text-sm">{info.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
