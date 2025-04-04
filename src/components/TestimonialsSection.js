export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ravi Patel",
      text: "The Kathiyawadi fish curry recipe is authentic and delicious! I've tried many recipes before but this one truly captures the traditional flavors. My family loved it!",
    },
    {
      name: "Priya Sharma",
      text: "The seafood quality guide alone is worth the price! I've always been hesitant to cook seafood at home, but now I know exactly what to look for at the market. Thank you SeaFreshh!",
    },
    {
      name: "Ajay Nair",
      text: "The tandoori fish recipe changed my weekend BBQ game! The marination technique is simply brilliant. My guests couldn't believe I made it at home without professional equipment.",
    },
    {
      name: "Meena Desai",
      text: "As someone who always struggled with seafood biryani, these recipes were a revelation! The step-by-step instructions are so clear, and the results are restaurant quality. Highly recommend!",
    },
    {
      name: "Vikram Singh",
      text: "I'm extremely pleased with this eBook! The crab recipes are outstanding, and the chef tips helped me perfect my technique. This collection is truly worth every rupee and more!",
    },
  ];

  return (
    <div className="testimonials-section">
      <h2 className="section-title">What People Say</h2>
      <p>
        Home chefs and seafood lovers across India
        <br />
        are enjoying our exclusive recipes
      </p>

      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <div className="testimonial-header">
              <div className="testimonial-image">
                <img
                  src="/images/profile-1.jpg"
                  width={58}
                  height={58}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                />
              </div>
              <div>
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-stars" style={{ color: "#2196f3" }}>
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
          </div>
        ))}
      </div>

      <button className="btn" style={{ marginTop: "40px" }}>
        DOWNLOAD NOW
      </button>
    </div>
  );
}
