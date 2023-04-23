// Create an user layout in nextjs
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Userlayout({ children }) {
  const Router = useRouter();
  const [isLogin, setIsLogin] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("userdata");
    if (user) {
      setIsLogin(1);
    } else {
      setIsLogin(0);
      Router.push("/auth/login");
    }
  }, []);
  return <div>{children}</div>;
}

export default Userlayout;
