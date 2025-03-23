
import { useState } from "react";

export default function Services() {
  const services = [
    { title: "Presentation Design", image: "/icons/presentation.png" },
    { title: "Audio - Visual Production", image: "/icons/audio-visual.png" },
    { title: "Translation Services", image: "/icons/translation.png" },
    { title: "Graphic Design", image: "/icons/graphic-design.png" },
    { title: "Research & Analytics", image: "/icons/research.png" },
    { title: "Data Processing", image: "/icons/data-processing.png" },
  ];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    //  First Email validation

    if (!email) {
      setMessage("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Invalid email format");
      return;
    }

    try {
      const response = await fetch("https://test.ezworks.ai/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.status === 422) {
        setMessage(data.error || "Invalid email");
      } else if (response.status === 200) {
        setMessage("Form Submitted SUCCESSFULLY");
        setEmail("");
      } else {
        setMessage("Something went wrong");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <section className="container mx-auto px-5 sm:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Now I am writing for the Left Side Part - Ez-Works Logo etc*/}

        <div className="space-y-4 text-center md:text-left cursor-pointer">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <img src="/logo.png" alt="EZ Works Logo" className="w-40 h-auto md:w-70 md:h-14" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Suite Of Business Support Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
          </p>
          
          {/* Here i Write for the Desktop View - Contact Form */}

          <form onSubmit={handleSubmit} className="hidden md:flex space-x-3">
            <input
              type="email"
              placeholder="Email Address"
              className="border px-4 py-3 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </button>
          </form>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>

        {/* Now I am writing for the Right Side Part - Services Cards */}

        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-900 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-blue-800 transition-all duration-300"
            >
              {/* Now for All the Service Image (Logo) */}

              <img src={service.image} alt={service.title} className="w-10 h-10 md:w-12 md:h-12" />
              
              {/* Now for all the Title & Description */}
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{service.title}</h3>
                <p className="text-xs sm:text-sm mt-1">
                  Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Now for the  Mobile View - Contact Form */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex flex-col sm:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email Address"
            className="border px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-sm cursor-pointer"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-3 rounded-md hover:bg-orange-600 text-sm cursor-pointer transition-all duration-300"
          >
            Contact Me
          </button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </section>
  );
}
