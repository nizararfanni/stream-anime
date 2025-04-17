import React, { useState } from "react";
import OngoingAnime from "../layout/OngoingAnime";
import CompletedAnime from "../layout/CompletedAnime";
import Footer from "../fragments/home/Footer";


const HomePage = () => {


  return (
    <div>
      <OngoingAnime />
      <CompletedAnime />
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
