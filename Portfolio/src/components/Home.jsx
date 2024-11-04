import React from "react";
import "./styles/Home.css";
import Navbar from "./Navbar";
import rohith from "../assets/rohith.jpg";
import { motion } from "framer-motion";
const Home = () => {
  const HomeInfo = {
    title: "web developer",
    name: "Hello, My name is Rohith kumar",
    description:
      "Welcome to my portfolio! I'm Budumuru Rohith Kumar, a passionate web developer with a focus on crafting exceptional digital experiences. With a blend of creativity and technical expertise, I specialize in building responsive web applications using cutting-edge technologies.",
    image: rohith,
  };
  return (
    <div className="home" id="Home">
      <Navbar />
      <div className="home-content">
        <motion.div
          className="left-home"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 1 }}
        >
          <span>{HomeInfo.title}</span>
          <span>{HomeInfo.name}</span>
          <span>{HomeInfo.description}</span>
        </motion.div>
        <div className="right-home">
          <motion.img
            src={HomeInfo.image}
            alt=""
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
