"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Image from "next/image";
import styles from "./TestimonialsSection.module.css";

export default function TestimonialsSection() {
  const { openOrderModal } = useContext(AppContext);
  const testimonials = [
    {
      name: "Ravi Patel",
      src: "/images/profile-1.jpg",
      text: "The Kathiyawadi fish curry recipe is authentic and delicious! I've tried many recipes before but this one truly captures the traditional flavors. My family loved it!",
    },
    {
      name: "Priya Sharma",
      src: "/images/profile-5.jpg",
      text: "The seafood quality guide alone is worth the price! I've always been hesitant to cook seafood at home, but now I know exactly what to look for at the market. Thank you SeaFreshh!",
    },
    {
      name: "Ajay Nair",
      src: "/images/profile-6.jpg",
      text: "The tandoori fish recipe changed my weekend BBQ game! The marination technique is simply brilliant. My guests couldn't believe I made it at home without professional equipment.",
    },
    {
      name: "Meena Desai",
      src: "/images/profile-4.jpeg",
      text: "As someone who always struggled with seafood biryani, these recipes were a revelation! The step-by-step instructions are so clear, and the results are restaurant quality. Highly recommend!",
    },
    {
      name: "Vikram Singh",
      src: "/images/profile-3.jpg",
      text: "I'm extremely pleased with this eBook! The crab recipes are outstanding, and the chef tips helped me perfect my technique. This collection is truly worth every rupee and more!",
    },
  ];

  return (
    <div className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>What People Say</h2>
      <p className={styles.sectionSubtitle}>
        Home chefs and seafood lovers across India
        <br className={styles.desktopBreak} />
        are enjoying our exclusive recipes
      </p>

      <div className={styles.testimonials}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <div className={styles.testimonialHeader}>
              <div className={styles.testimonialImage}>
                <Image
                  src={testimonial.src}
                  width={50}
                  height={50}
                  alt={`${testimonial.name}'s profile`}
                />
              </div>
              <div>
                <div className={styles.testimonialName}>{testimonial.name}</div>
                <div className={styles.testimonialStars}>★★★★★</div>
              </div>
            </div>
            <p className={styles.testimonialText}>{testimonial.text}</p>
          </div>
        ))}
      </div>

      <button className={styles.downloadButton} onClick={openOrderModal}>
        DOWNLOAD NOW
      </button>
    </div>
  );
}
