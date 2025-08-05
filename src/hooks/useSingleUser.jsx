"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useSingleUser = () => {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    // Run only if we have an email and session is ready
    if (!email || status !== "authenticated") return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users?email=${email}`);
        setUser(res?.data?.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [email, status]); // dependency array updated

  return { user };
};

export default useSingleUser;
