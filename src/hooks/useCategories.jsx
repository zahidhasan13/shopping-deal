"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("/api/category");
      setCategories(res?.data?.categories);
    };
    fetchCategory();
  }, []);
  return { categories };
};

export default useCategories;
