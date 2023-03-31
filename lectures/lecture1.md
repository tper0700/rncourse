import "./styles.css";
import React, {useState} from "react";

sayHello = (name) => {

  alert("Hello there " + name);
  document.getElementById(name).innerText = name;
};

function User(info) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = () => {
    setCount(count+1);
    alert("hello " + info.name + " : " + name)
  }

  const handleInputChange = (event) => {
    setName(event.target.value);
  }

  const styles = {
    backgroundColor: count % 2 === 0 ? "lightblue" : "lightgreen"
  }

  return (
    <div style={styles}>
    <h2>User: {info.name}</h2>
    <p>From... {info.town} (clicked {count} times}</p>
    <input type="text" value={name} onChange={handleInputChange}/>
    <button onClick={handleClick}>{info.name}</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="Apply">
      <h1>Hello World</h1>
      <h2>Start editing to see some magic happen!</h2>

      <User name="Kat" town="Spokane"/>
      <User name="Joe" town="Memphis"/>
      <User name="Mickey" town="Saratoga"/>
    </div>
  );
}

