import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Hero from "../components/Hero";
import { useState, useEffect, useRef } from "react";

const useParallax = (ref, speed = 0.5, direction = "vertical") => {
    useEffect(() => {
        const handleScroll = () => {
        if (!ref.current) return;
        const scrolled = window.scrollY;
        const element = ref.current;
        const offset = scrolled * speed;
        element.style.transform =
            direction === "vertical"
            ? `translateY(${offset}px)`
            : `translateX(${offset}px)`;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref, speed, direction]);
};


const use3DRotation = (ref) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const handleMouseMove = (e) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * 20;
        element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        };
        const handleMouseLeave = () => {
        element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        };
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref]);
};

const useScrollAnimation = (ref, threshold = 0.1, animation = "animate-fade-in") => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animation);
            entry.target.style.opacity = "1";
          }
        },
        { threshold }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, threshold, animation]);
};


const Home = () => {
    const heroTextRef = useRef(null);
    const heroImageRef = useRef(null);
    const categoriesRef = useRef(null);
    const featuredRef = useRef(null);
    // const trendingRef = useRef(null);
    // const reviewsRef = useRef(null);
    // const newsletterRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    // const statsRef = useRef(null);
    // const footerRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    // Add styles to head
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
    @keyframes slideUp {
    from {
    opacity: 0;
    transform: translateY(20px);
    }
    to {
    opacity: 1;
    transform: translateY(0);
    }
    }
    @keyframes slideRight {
    from {
    opacity: 0;
    transform: translateX(-20px);
    }
    to {
    opacity: 1;
    transform: translateX(0);
    }
    }
    @keyframes slideLeft {
    from {
    opacity: 0;
    transform: translateX(20px);
    }
    to {
    opacity: 1;
    transform: translateX(0);
    }
    }
    @keyframes fadeIn {
    from {
    opacity: 0;
    }
    to {
    opacity: 1;
    }
    }
    .animate-slide-up {
    animation: slideUp 1s ease forwards;
    }
    .animate-slide-right {
    animation: slideRight 1s ease forwards;
    }
    .animate-slide-left {
    animation: slideLeft 1s ease forwards;
    }
    .animate-fade-in {
    animation: fadeIn 1s ease forwards;
    }
    `;
        document.head.appendChild(style);
        return () => {
        document.head.removeChild(style);
        };
    }, []);

    useParallax(heroTextRef, 0.3, "vertical");
    //useParallax(heroImageRef, -0.2, "horizontal");
    //useScrollAnimation(categoriesRef, 0.1, "animate-slide-up");
    //useScrollAnimation(featuredRef, 0.1, "animate-slide-right");
    //useScrollAnimation(trendingRef, 0.1, "animate-slide-up");
    //useScrollAnimation(reviewsRef, 0.1, "animate-fade-in");
    //useScrollAnimation(newsletterRef, 0.1, "animate-slide-up");
    //useScrollAnimation(statsRef, 0.1, "animate-slide-left");
    //useScrollAnimation(footerRef, 0.1, "animate-fade-in");
    use3DRotation(card1Ref);
    use3DRotation(card2Ref);

  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    console.log(id, cat);
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;

    navigate(url);
    console.log(url);
  };

  const calculateTimeLeft = () => {
    const saleEndDate = new Date("2025-03-15T23:59:59").getTime();
    const now = new Date().getTime();
    const difference = saleEndDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add classes to trigger the animation
            entry.target.classList.add(
              "opacity-100", // Fade in
              "translate-y-0", // Slide up
              "scale-100" // Scale to original size
            );
            // Remove initial classes that hide or transform the element
            entry.target.classList.remove(
              "opacity-0", // Initial opacity
              "translate-y-10", // Initial position
              "scale-75" // Initial scale
            );
          } else {
            // Optionally remove classes when the element is out of the viewport
            entry.target.classList.remove(
              "opacity-100",
              "translate-y-0",
              "scale-100"
            );
            entry.target.classList.add(
              "opacity-0",
              "translate-y-10",
              "scale-75"
            );
          }
        });
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    if (categoriesRef.current) {
      observer.observe(categoriesRef.current); // Start observing the element
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (categoriesRef.current) {
        observer.unobserve(categoriesRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0");
            entry.target.classList.remove("opacity-0", "translate-x-10");
          } else {
            entry.target.classList.remove("opacity-100", "translate-x-0");
            entry.target.classList.add("opacity-0", "translate-x-10");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }
    if (card1Ref.current) {
      observer.observe(card1Ref.current);
    }
    if (card2Ref.current) {
      observer.observe(card2Ref.current);
    }

    return () => {
      if (featuredRef.current) observer.unobserve(featuredRef.current);
      if (card1Ref.current) observer.unobserve(card1Ref.current);
      if (card2Ref.current) observer.unobserve(card2Ref.current);
    };
  }, []);

  return (
    <section className="bg-white">

      <Hero heroImageRef={heroImageRef} heroTextRef={heroTextRef} />

      {/* categories section */}
      <section
        ref={categoriesRef}
        className="opacity-0 scale-75 translate-y-10 transition-all duration-500     ease-linear pb-10 my-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-5">
            Shop by Category
          </h2>
          <div className="flex items-center overflow-x-auto overflow-y-hidden gap-8 justify-between py-5">
            {loadingCategory
              ? new Array(12).fill(null).map((_, index) => (
                  <div
                    key={index + "loadingcategory"}
                    className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse w-60"
                  >
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                ))
              : categoryData.map((cat, index) => (
                  <div
                    key={cat._id + "displayCategory"}
                    className="w-full h-full group relative rounded-lg shadow-lg transition-transform hover:-translate-y-2 "
                    onClick={() =>
                      handleRedirectProductListpage(cat._id, cat.name)
                    }
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full min-w-[20vw] transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {cat.name}
                        </h3>
                        <p className="text-gray-200">{cat.count}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* categories section end */}

      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">
                Special Festival Offer
              </h2>
              <p className="text-xl opacity-90">
                Get 30% off on selected items
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-center transition-all duration-500 ease-in-out">
                <div className="text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-white text-center transition-all duration-500 ease-in-out">
                <div className="text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-white text-center transition-all duration-500 ease-in-out">
                <div className="text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-white text-center transition-all duration-500 ease-in-out">
                <div className="text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 bg-gray-50">
        <div
          ref={featuredRef}
          className="max-w-7xl mx-auto px-6 opacity-0 transition-all duration-1000 transform translate-x-10"
        >
          <div className="grid grid-cols-2 gap-8">
            <div
              ref={card1Ref}
              className="relative overflow-hidden rounded-lg group transition-transform duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="https://public.readdy.ai/ai/img_res/9f894d5fc6faa5980217a97eff356e06.jpg"
                alt="Premium Collection"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white backdrop-blur-sm">
                <h3
                  className="text-3xl font-bold mb-4 transform translate-z-20"
                  style={{ transform: "translateZ(50px)" }}
                >
                  Premium Collection
                </h3>
                <button
                  className="bg-white text-black px-8 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 !rounded-button whitespace-nowrap"
                  style={{ transform: "translateZ(75px)" }}
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div
              ref={card2Ref}
              className="relative overflow-hidden rounded-lg group transition-transform duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="https://public.readdy.ai/ai/img_res/b8290cdff3339e074caa163c59af5a72.jpg"
                alt="New Arrivals"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white">
                <h3 className="text-3xl font-bold mb-4">New Arrivals</h3>
                <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </section>
  );
};

export default Home;
