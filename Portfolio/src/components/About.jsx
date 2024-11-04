import React from "react";
import "./styles/About.css";
import { motion } from "framer-motion";
const About = () => {
  const AboutSection = [
    {
      description:
        "  BTech final year student specializing in AI, seamlessly blending the realms of artificial intelligence with front-end development using ReactJS. Passionate about crafting intuitive interfaces and leveraging AI for innovative solutions",
    },
    { FrontendSkills: ["HTML", "CSS", "Tailwind", "JavaScript", "ReactJS"] },
    { ProgrammingSkills: ["C", "Java", "Python"] },
    {
      Database: ["MongoDB", "SQL"],
    },
    { versionCL: ["Git & GitHub"] },
    {
      Experience:
        "I had done 15+ Responsive Websites using the React Js. And worked as Frontend Developer in ONWE StartUp.",
    },
  ];

  return (
    <div className="about" id="About">
      <div>
        <span className="about-name">About</span>
        <span className="title">About Me</span>
        <motion.div
          className="content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 1 }}
        >
          <span className="desc">{AboutSection[0].description}</span>
        </motion.div>
        <div className="skills">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
          >
            <span className="title">Frontend Skills</span>
            <div className="content">
              {AboutSection[1].FrontendSkills.map((item, i) => (
                <ul key={i}>
                  <li>{item}</li>
                </ul>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
          >
            <span className="title">Programming Skills</span>
            <div className="content">
              {AboutSection[2].ProgrammingSkills.map((item, i) => (
                <ul key={i}>
                  <li>{item}</li>
                </ul>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
          >
            <span className="title">Database Management System</span>
            <div className="content">
              {AboutSection[3].Database.map((item, i) => (
                <ul key={i}>
                  <li>{item}</li>
                </ul>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
          >
            <span className="title">Version Control System</span>
            <div className="content">
              {AboutSection[4].versionCL.map((item, i) => (
                <ul key={i}>
                  <li>{item}</li>
                </ul>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 1 }}
        >
          <span className="title">Experience</span>
          <div className="content">{AboutSection[5].Experience}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
