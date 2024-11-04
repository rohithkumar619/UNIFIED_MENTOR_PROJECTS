import React from "react";
import "./styles/Contact.css";
import facebook from "../assets/social/facebook.png";
import twitter from "../assets/social/twitter.png";
import youtube from "../assets/social/youtube.png";
import linkedin from "../assets/social/linkedin.png";
import github from "../assets/social/github.png";
import { motion } from "framer-motion";
const Contact = () => {
  const social = [
    {
      name: "Facebook",
      image: facebook,
      link: "https://www.facebook.com/rohith.budumuru.5/",
    },
    {
      name: "Twitter",
      image: twitter,
      link: "",
    },
    {
      name: "Youtube",
      image: youtube,
      link: "https://www.youtube.com/@collegecoders1",
    },
    {
      name: "LinkedIn",
      image: linkedin,
      link: "https://www.linkedin.com/in/budumuru-rohith-kumar-5aa340258/",
    },
    {
      name: "GitHub",
      image: github,
      link: "https://github.com/rohithkumar619",
    },
  ];
  return (
    <motion.div
      className="contact"
      id="Contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 1 }}
    >
      <div className="icons">
        {social.map((item) =>
          item.link == "" ? (
            ""
          ) : (
            <a href={item.link}>
              <div className="social-icons">
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </div>
            </a>
          )
        )}
      </div>
      <span className="quote">
        Prepared to turn your ideas into reality ? I'm here to help
      </span>
    </motion.div>
  );
};

export default Contact;
