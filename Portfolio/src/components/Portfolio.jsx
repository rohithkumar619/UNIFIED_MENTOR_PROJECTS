import React from "react";
import "./styles/Portfolio.css";
import { motion } from "framer-motion";
const Portfolio = () => {
  const projects = {
    image:
      "https://imgs.search.brave.com/7zqX1A-z5avc8rTgoXdwAO7aX4mZw9TGGP1sqbl2smU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jcmVhdGl2ZS1j/aGFyYWN0ZXJzLWNh/cnRvb24tdGVjaC1z/dGFydHVwLXRlYW0t/YnJhaW5zdG9ybWlu/Zy1zZXNzaW9uXzU3/ODM5OS0xOTM1Lmpw/Zz9zaXplPTYyNiZl/eHQ9anBn",
    image1: "https://rohithkumarportfolio.netlify.app/assets/gym-Bp_kykoD.jpg",
    image2:
      "https://rohithkumarportfolio.netlify.app/assets/travel-DiRR6KMX.jpg",
    image3: "https://rohithkumarportfolio.netlify.app/assets/ecom-BBdfkM6m.jpg",
    image4:
      "https://rohithkumarportfolio.netlify.app/assets/education-Bnb6FH2O.jpg",
  };
  const project = [
    {
      image: projects.image1,
      title: "Gym website",
      desc: "A website for managing gym memberships and schedules.",
      link: "https://rohithgymapp.netlify.app/",
    },
    {
      image: projects.image2,
      title: "Travel website",
      desc: "A platform which helps to book tours to different destinations.",
      link: "https://rohithtravelapp.netlify.app/",
    },
    {
      image: projects.image3,
      title: "Ecom website",
      desc: "An e-commerce platform for buying and selling various products.",

      link: "https://rohithecomapp.netlify.app/",
    },
    {
      image: projects.image4,
      title: "Educational website",
      desc: "A platform providing educational resources and courses.",

      link: "https://rohitheducationapp.netlify.app/",
    },
  ];
  return (
    <div className="portfolio" id="Portfolio">
      <motion.div
        className="left-port"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        <span className="checkout">Checkout My Projects</span>
        <img className="image2" src={projects.image} alt="" />
      </motion.div>

      <motion.div
        className="right-port"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        {project.map((item, i) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
            className="project"
          >
            <img className="image" src={item.image} alt="" />
            <div className="pro-con">
              <span className="port-title">{item.title}</span>
              <span className="port-desc">{item.desc}</span>
              <button>
                <a href={item.link} target="_blank">
                  Explore
                </a>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Portfolio;
