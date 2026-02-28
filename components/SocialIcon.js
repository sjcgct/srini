import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialIcon = ({ link, icon }) => {
  const icons = {
    "facebook-square": FaFacebookF,
    "instagram-square": FaInstagram,
    "twitter-square": FaTwitter,
    linkedin: FaLinkedinIn,
  };

  const IconComponent = icons[icon];

  if (!IconComponent) return null;

  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center 
                   bg-black dark:bg-white 
                   text-white dark:text-black 
                   rounded-md hover:opacity-80 
                   transition duration-200"
      >
        <IconComponent />
      </a>
    </li>
  );
};

export default SocialIcon;