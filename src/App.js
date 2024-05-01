import React, { useState, useEffect } from "react";

function App() {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://animechan.xyz/api/random");
        const data = await response.json();
        setFlag(data.character);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {flag.split("").map((char, index) => (
            <TypewriterChar key={index} char={char} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TypewriterChar({ char, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, index * 500);
    return () => clearTimeout(timeout);
  }, [index]);

  return <li>{visible ? char : ""}</li>;
}

export default App;

// Bonus
// Script used to to get the URL in step 2
// function extractHiddenURL() {
//   const selector = 'code[data-class^="23"] > div[data-tag$="93"] > span[data-id*="21"] > i.char';
//   const elements = document.querySelectorAll(selector);
//   const url = Array.from(elements).map(el => el.getAttribute('value')).join('');
//   console.log(url);
//   return url;
// }
