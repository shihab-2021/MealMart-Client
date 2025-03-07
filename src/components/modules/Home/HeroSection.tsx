import Image from "next/image";
import Link from "next/link";
import Home1 from "@/assets/Home1.jpg";
import Home2 from "@/assets/Home2.png";
import Home3 from "@/assets/Home3.jpg";

export default function HeroSection() {
  const infoData = [
    {
      image: Home1,
      title: "Easy & Convenient",
      subTitle:
        "Quick recipes designed for busy people, delivered to your door",
    },
    {
      image: Home2,
      title: "The Best Quality",
      subTitle:
        "Enjoy organic fresh produce and clean ingredients. Proud certified organic handler",
    },
    {
      image: Home3,
      title: "Meal Planning Made Easy",
      subTitle: "Put meal planning on autopilot to eat well all week",
    },
  ];
  return (
    <div>
      <div
        className="relative w-full h-[80vh] mt-16 flex items-center justify-center bg-cover bg-center hero-bg"
        //   style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content */}
        <div className="relative text-center text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold">
            You&apos;re busy, We&apos;re tasty.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Save time, eat well, feel Splendid! Ready-to-eat, plant-rich
            MealMart delivered to your door.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href={"/mealLists"}
              className="px-6 py-3 text-lg bg-blue-950 hover:bg-primary-dark rounded"
            >
              Order Now
            </Link>
            {/* <Button className="px-6 py-3 text-lg border border-white bg-transparent hover:bg-white hover:text-black">
            Explore Menu
          </Button> */}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-3xl font-bold max-w-[650px] text-center mx-auto font-arima">
          Check Out What&apos;s New at HelloFresh: Fast, Easy Meals for Every
          Schedule
        </p>
        <div className="mx-auto w-fit my-10">
          <div className="flex flex-wrap gap-6">
            {infoData?.map((info: any, index: number) => (
              <div className="flex flex-col gap-1" key={index}>
                <div className="flex-shrink p-1">
                  <Image
                    src={info?.image}
                    className="max-w-[180px] mx-auto"
                    width={500}
                    height={500}
                    alt="info image"
                  />
                </div>
                <div className="max-w-[310px] text-center">
                  <h1 className="text-lg font-bold mb-1">{info.title}</h1>
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
