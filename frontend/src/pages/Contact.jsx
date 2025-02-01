import React from "react";
import Title from "../components/Title";
import contactUsImage from "../assets/cu2.jpg";
import NewsLetterBox from "../components/NewsLetterBox"; 

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={contactUsImage} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            No.46, Dharmaloka Mawatha <br /> Colombo7.
          </p>
          <p classname="text-gray-500">
            Tel: 011 22 46 789 <br /> Email: adminsportswear@gmail.com{" "}
          </p>
          <p className="font-semibold text-xl text-gray-600">Careers Forever</p>
          <p classname="text-gray-500">Learn More About Our Teams</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white trasition-all duration-500">
            Explore More
          </button>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  );
};

export default Contact;
