import { useState } from "react";
import { useEffect } from "react";

export default function Clicker({ keyName, color }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem(keyName, count);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex justify-center mt-3">
      <div className="p-3 " style={{ color }}>
        Clicks count: {count}
      </div>
      <button
        onClick={buttonClick}
        className=" p-2  border border-black rounded-md "
      >
        Click me
      </button>
    </div>
  );
}
