import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        {/* Left: Text */}
        <p className="text-gray-600 text-center md:text-left">
          Made with <span className="text-red-500">❤️</span> by Yamina
        </p>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yamina169/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
          >
            <FaGithub size={20} className="text-gray-800" />
          </a>
          <a
            href="https://www.linkedin.com/in/yamina-rezgui/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
          >
            <FaLinkedin size={20} className="text-blue-700" />
          </a>
        </div>

        {/* Right: Copyright */}
        <p className="text-gray-400 text-center md:text-right text-sm">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
