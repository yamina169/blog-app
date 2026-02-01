import heroImg from "../assests/homeImg.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPenNib, FaSearch, FaUserShield } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";

const Home = () => {
  return (
    <div className="p-6 md:px-20 bg-gray-50 min-h-screen">
      {/* HERO */}
      <div className=" flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2 space-y-8">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Discover & Share Tech Knowledge
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-8"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Tech TN is a modern blogging application for developers and tech
            enthusiasts. Share your knowledge, explore articles, and stay
            updated with the latest in technology.
          </motion.p>
        </div>

        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroImg}
            alt="Tech TN"
            className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
      {/* FEATURES */}
      <div className="mt-36">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Powerful Blog Platform
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: FaPenNib,
              title: "Write & Publish",
              desc: "Share your knowledge through an intuitive and modern writing experience.",
              color: "text-indigo-500",
            },
            {
              icon: FaSearch,
              title: "Smart Search",
              desc: "Easily find articles by keywords, tags, and categories.",
              color: "text-purple-400",
            },
            {
              icon: FaUserShield,
              title: "Secure Accounts",
              desc: "Authentication system to protect user data and manage content.",
              color: "text-blue-400",
            },
            {
              icon: MdOutlineDevices,
              title: "Responsive Design",
              desc: "Smooth experience across desktop, tablet, and mobile devices.",
              color: "text-black",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center"
              >
                <Icon
                  size={40}
                  className={`mx-auto mb-5 group-hover:scale-110 transition ${feature.color}`}
                />
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-6">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="hover:-translate-y-1 transition duration-300  mt-36 mb-24 text-center bg-gradient-to-r from-indigo-500 via-purple-400 to-blue-400 py-16 px-6 rounded-3xl text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Start Your Tech Journey Today
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Join Tech TN and become part of a growing tech community.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
