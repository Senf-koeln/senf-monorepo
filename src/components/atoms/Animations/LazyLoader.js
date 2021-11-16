import {useEffect, useState } from "react";
import Loader from "./Loader";

//show loader after a delay
//https://stackoverflow.com/questions/57404653/react-suspense-prevent-flashing-of-fallback-spinner
const LazyLoader = ({ delay = 5000, ...props }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <Loader /> : null;
};

export { LazyLoader as default };
