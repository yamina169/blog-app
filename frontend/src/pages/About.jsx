import aboutImage from "../assests/me.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 px-6 md:px-20 py-20">
      {/* Hero / Introduction */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-20">
        <motion.img
          src={aboutImage}
          alt="Yamina Rezgui"
          className="rounded-full w-60 md:w-80 shadow-2xl border-4 border-indigo-200"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="flex flex-col gap-4 md:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
            Hi, I am{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 font-bold px-4 py-2 rounded-lg text-white">
              Yamina Rezgui
            </span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-2">
            Full-Stack Web Developer & Software Engineering Student
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-2">
            This project is part of my learning journey during my PFE
            internship. I focused on building a blog app to practice front-end
            and back-end development.
          </p>
        </motion.div>
      </div>

      {/* Project Description */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-8 md:p-16 space-y-8 text-gray-700 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-500 mb-6">
          About This Project
        </h2>

        <p className="text-lg md:text-xl text-justify leading-relaxed">
          This project is a learning experience during my PFE internship. Its
          goal was to practice web development by creating a functional blog
          application.
        </p>

        <p className="text-lg md:text-xl text-justify leading-relaxed">
          I focused on a clean and responsive interface while learning React,
          NestJS, PostgreSQL, and Docker. This project helped me understand
          component-based design, API integration, and front-end/back-end
          communication.
        </p>

        <p className="text-lg md:text-xl text-justify leading-relaxed">
          Overall, this project reflects my **practical learning journey** and
          my growth in software development skills.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
