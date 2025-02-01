import React from "react";
import Title from "../components/Title";
import aboutUsImage from "../assets/about-us.jpg";
import NewsLetterBox from "../components/NewsLetterBox"; 


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={aboutUsImage} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b>Sports Wear</b> was born out of a passion for active living and a
            commitment to revolutionizing the way people shop for sportswear
            online. Our journey began with a simple idea: to create a platform
            where athletes, fitness enthusiasts, and everyday adventurers can
            discover, explore, and purchase the best in sportswear and
            accessories, all from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of premium-quality products that blend style, comfort, and
            performance. From cutting-edge athletic wear and footwear to
            essential accessories, we offer an extensive collection sourced from
            trusted global brands that share our dedication to excellence.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Sports Wear, our mission is to inspire and empower individuals to
            lead active, healthy lifestyles. We’re dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond. With Sports Wear, you
            can count on choice, convenience, and confidence every step of the
            way. Whether you're training for your next big competition or simply
            embracing an active lifestyle, Sports Wear is here to support your
            journey. Join us as we redefine what it means to shop for
            sportswear—effortlessly and passionately.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gp-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gp-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gp-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>

      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
