import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Move Without Limits
        </h1>

        <p className="mt-6 text-lg max-w-xl mx-auto">
          Performance gear built for athletes, creators, and innovators.
        </p>

        <button className="mt-8 bg-white text-black px-8 py-3 font-semibold rounded-full hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
