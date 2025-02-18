import React from "react";
import hero_holi from "../assets/hero_banner/hero_holi.png";

const Hero = ({ heroImageRef, heroTextRef }) => {
  return (
    <section className="h-screen">
      <div
        ref={heroImageRef}
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700"
        style={{
          backgroundImage: `url(${hero_holi})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div
          ref={heroTextRef}
          className="max-w-2xl text-white transform transition-transform duration-700"
        >
          <h1 className="text-5xl font-bold mb-6">
            Celebrate Every Moment with Elegance
          </h1>
          <p className="text-xl mb-8">
            Discover our curated collection of handcrafted festive essentials
            that bring joy to your celebrations.
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors !rounded-button whitespace-nowrap">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
