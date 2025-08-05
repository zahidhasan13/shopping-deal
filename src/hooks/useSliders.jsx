"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const useSliders = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchslider = async () => {
      const res = await axios.get("/api/sliders");
      setSliders(res?.data);
    };
    fetchslider();
  }, []);
  return { sliders };
};

export default useSliders;
