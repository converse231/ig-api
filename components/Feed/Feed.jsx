"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import PostCard from "./PostCard";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Feed({ data, index }) {
  const modalref = useRef(null);
  const router = useRouter();
  const posts = data?.data;
  const [modalActive, setModalActive] = useState(false);

  console.log("Data:", data); // Log the data received from the API
  console.log("Posts:", posts);

  useEffect(() => {
    let handler = (e) => {
      if (modalref.current && !modalref.current.contains(e.target)) {
        router.back();
        setModalActive(false);
      }
    };

    document.addEventListener("mousedown", handler);
  }, [router]);

  if (!data) {
    return <p>Loading...</p>;
  }

  function handleClick(index) {
    if (posts && posts.length > index) {
      // Check if posts is defined and has elements
      router.push(`?index=${index}`, { scroll: false });
      setModalActive(true);
    }
  }

  return (
    <>
      {modalActive && (
        <div className="z-50 fixed w-screen h-screen bg-black/50 flex justify-center items-center overflow-x-hidden">
          {posts && posts[index]?.media_url.includes(".mp4") ? ( // Check if posts is defined before accessing its elements
            <div ref={modalref} className="relative">
              <button
                className="absolute p-5 z-50"
                onClick={() => setModalActive(false)}
              >
                <ArrowLeft className="text-white  bg-white/25 rounded-full p-1 h-8 w-8" />
              </button>
              <video
                width="450px"
                height="400px"
                autoPlay
                controls
                loop
                preload="none"
              >
                <source src={posts[index].media_url} />
              </video>
            </div>
          ) : (
            <div ref={modalref} className="relative">
              <button className="absolute p-5" onClick={() => router.back()}>
                <ArrowLeft className="text-white  bg-white/25 rounded-full p-1 h-8 w-8" />
              </button>
              <Image
                src={posts[index]?.media_url}
                alt="photo"
                height={800}
                width={600}
              />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-10 items-center">
        <div>
          <div className="flex my-5 justify-between items-center">
            <div className="flex gap-3">
              <div className="bg-red-400 w-fit p-2 rounded-full">
                <Image
                  src="https://www.gelballundercover.com.au/cdn/shop/files/GBU_Logo_Black_PNG.png?v=1614386085&width=125"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain h-[40px] w-[40px] "
                />
              </div>
              <div>
                <p className="text-md font-bold">@gelball_undercover</p>
                <p>Gellball Undercover</p>
              </div>
            </div>
            <div>
              <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
                <div className="flex items-center gap-4">
                  <span>Checkout GBU</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5">
            {posts?.slice(0, 10).map((post, index) => (
              <div
                key={post.id}
                onClick={() => handleClick(index)}
                className="h-[250px] w-[250px] overflow-hidden cursor-pointer"
              >
                {post.media_url.includes(".mp4") ? (
                  <video
                    width="250px"
                    height="full"
                    autoPlay
                    muted
                    preload="none"
                    loop
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <source src={post.media_url} />
                  </video>
                ) : (
                  <img
                    src={post.media_url}
                    className="object-cover h-[250px] w-[250px] hover:scale-105 transition-all duration-300"
                    alt="Post"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[1200px] mb-20">
          <div className="flex my-5 justify-between items-center">
            <div className="flex gap-3">
              <div className="bg-red-400 w-fit p-2 rounded-full">
                <Image
                  src="https://www.gelballundercover.com.au/cdn/shop/files/GBU_Logo_Black_PNG.png?v=1614386085&width=125"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain h-[40px] w-[40px] "
                />
              </div>
              <div>
                <p className="text-md font-bold">@gelball_undercover</p>
                <p>Gellball Undercover</p>
              </div>
            </div>
            <div>
              <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
                <div className="flex items-center gap-4">
                  <span>Checkout GBU</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
          <Carousel>
            <CarouselContent>
              {posts?.map((post, index) => (
                <CarouselItem
                  className="basis-1/3 rounded-md overflow-hidden"
                  key={post.id}
                >
                  <div
                    className="bg-blue-400 cursor-pointer"
                    onClick={() => handleClick(index)}
                  >
                    {post.media_url.includes(".mp4") ? (
                      <div className="h-[400px] w-[400px] overflow-hidden">
                        <video
                          width="100%"
                          height="250px"
                          autoPlay
                          muted
                          preload="none"
                          loop
                        >
                          <source src={post.media_url} />
                        </video>
                      </div>
                    ) : (
                      <img
                        src={post.media_url}
                        class="object-cover h-[400px] w-full cursor-pointer"
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-full my-10">
          <div className="flex my-5 justify-between items-center">
            <div className="flex gap-3">
              <div className="bg-red-400 w-fit p-2 rounded-full">
                <Image
                  src="https://www.gelballundercover.com.au/cdn/shop/files/GBU_Logo_Black_PNG.png?v=1614386085&width=125"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain h-[40px] w-[40px] "
                />
              </div>
              <div>
                <p className="text-md font-bold">@gelball_undercover</p>
                <p>Gellball Undercover</p>
              </div>
            </div>
            <div>
              <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
                <div className="flex items-center gap-4">
                  <span>Checkout GBU</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div
              className="col-span-2 row-span-2 bg-slate-500 overflow-hidden cursor-pointer"
              onClick={() => handleClick(index)}
            >
              {posts[0].media_url.includes(".mp4") ? (
                <div className="h-[400px] w-[508px]">
                  <video
                    autoPlay
                    muted
                    loop
                    preload="none"
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <source src={posts[0].media_url} />
                  </video>
                </div>
              ) : (
                <img
                  src={posts[0].media_url}
                  className="object-cover h-[500px] aspect-square w-full scale-105 hover:scale-110 transition-all duration-300"
                />
              )}
            </div>
            {posts?.slice(1, 7).map((post, index) => (
              <div
                key={post.id}
                className="bg-slate-500 overflow-hidden cursor-pointer"
                onClick={() => handleClick(index + 1)}
              >
                {post.media_url.includes(".mp4") ? (
                  <div className="h-[250px] w-[250px] overflow-hidden">
                    <video
                      width="250px"
                      height="250px"
                      autoPlay
                      muted
                      preload="none"
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <source src={post.media_url} />
                    </video>
                  </div>
                ) : (
                  <img
                    src={post.media_url}
                    className="object-cover h-[250px] w-[250px] hover:scale-105 duration-300"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
