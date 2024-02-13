import { useState, useEffect, useRef } from 'react';
import Cloud from "./Cloud";
import './Rain.css'
const Game = () => {
  // const clouds = Array.from({ length: 1000 }, (index) => <Cloud startPosition={Math.floor(Math.random() * 2)} key={index}/>);
  
    // <div>

    //     {clouds.map((cloud) => (
    //       cloud // Remove curly braces around cloud
    //   ))}
    // </div>

    const [divs, setDivs] = useState([]);
  const screenHeight = useRef(window.innerHeight);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDiv = <Cloud startPosition={Math.floor(Math.random() * 2)} key={divs.length}/> // New div starts at the top
      setDivs(prevDivs => [...prevDivs, newDiv]);
    }, 1000); // Interval to add new div every 1 second

    return () => clearInterval(interval);
  }, [divs.length]);

  useEffect(() => {
    const handleScroll = () => {
      screenHeight.current = window.innerHeight;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const removeDivs = () => {
      setDivs(prevDivs => prevDivs.filter(div => div.top < screenHeight.current));
    };
    const interval = setInterval(removeDivs, 100); // Check every 100ms if any divs need to be removed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {divs.map(div => (
        <div key={div.id} className="falling-div" style={{ top: div.top }} />
      ))}
    </div>
  );
}

export default Game;

