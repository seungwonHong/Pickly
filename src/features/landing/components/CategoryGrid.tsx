"use client";
import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  return (
    <div className="flex flex-col mx-auto md:mt-[100px] mt-[36px] w-[80vw] overflow-x-hidden ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex md:flex-row flex-col md:items-center md:justify-center items-start justify-start"
      >
        <h1 className="text-white lg:text-[64px] text-[32px] font-extrabold">
          Explore <br /> through categories
        </h1>
        <span className="text-[#808080] md:ml-auto md:mt-0 mt-[16px] lg:text-[20px] text-[12px] font-extrabold">
          Start your journey here. <br /> Discover products that match your
          vibe.
        </span>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:gap-[24px] gap-[16px] lg:mt-[102px] md:mt-[51px] mt-[27px] mx-auto w-full">
        <CategoryCard
          category="Music"
          description="Discover the rhythm that moves you."
          img="/images/music.png"
          color="#C5D17C"
          url="/homepage/음악?sort=recent"
        />
        <CategoryCard
          category="Movie/Drama"
          description="Discover films and series that move you."
          img="/images/moviedrama.png"
          color="#F75532"
          url="/homepage/영화%2F드라마?sort=recent"
        />
        <CategoryCard
          category="Lecture/Book"
          description="Find curated content from books and
          lectures to ignite creativity and action."
          img="/images/lecturebook.png"
          color="#A953FF"
          url="/homepage/강의%2F책?sort=recent"
        />
        <CategoryCard
          category="Hotel"
          description="Unique stays and hidden gems for your next trip."
          img="/images/hotel.png"
          color="#49AF1A"
          url="/homepage/호텔?sort=recent"
        />
        <CategoryCard
          category="Furniture/Interior"
          description="Design ideas and cozy styles to upgrade your space."
          img="/images/furnitureinterior.png"
          color="#D676C1"
          url="/homepage/가구%2F인테리어?sort=recent"
        />
        <CategoryCard
          category="Restaurant"
          description="Uncover dining spots that blend taste, ambiance, and unforgettable moments."
          img="/images/restaurant.png"
          color="#FF7E46"
          url="/homepage/식당?sort=recent"
        />
        <CategoryCard
          category="Electronic Devices"
          description="New gadgets that enhance your daily life."
          img="/images/electronicdevices.png"
          color="#23B581"
          url="/homepage/전자기기?sort=recent"
        />
        <CategoryCard
          category="Makeups"
          description="Beauty tips and must-haves for your best look."
          img="/images/makeups.png"
          color="#FD529A"
          url="/homepage/화장품?sort=recent"
        />
        <CategoryCard
          category="Clothes/Accessories"
          description="Style picks that express who you are."
          img="/images/clothesaccessories.png"
          color="#757AFF"
          url="/homepage/의류%2F악세서리?sort=recent"
        />
        <CategoryCard
          category="App"
          description="Handpicked apps for your daily life."
          img="/images/app.jpg"
          color="#3098E3"
          url="/homepage/앱?sort=recent"
          className="md:hidden"
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
