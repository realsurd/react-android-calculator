import { FaGithub } from "react-icons/fa";
import ReactSwitch from 'react-switch';
import { createContext } from 'react';
import { useState } from 'react';

export const Theme1context = createContext(null);

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "+", "-", "*",];

  const updateCalc = value => {
		if (
			ops.includes(value) && calc === "" || 
			ops.includes(value) && ops.includes(calc.slice(-1)
			)
		) {
			return;
		}
		setCalc(calc + value);

		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}
	}

  const multiplyNumbers = () => {
    const numbers = [];

    for (let i = 1; i < 10; i++) {
      numbers.push (
        <button 
        onClick={() => updateCalc(i.toString())}
        key={i}>
          {i}
          </button>
      )
    }
    return numbers;
  }

  const calculate = () => {
		setCalc(eval(calc).toString());
	}

  const deleteLast = () => {
		if(calc === '') {
			return;
		} 
		const value = calc.slice(0, -1);
		setCalc(value);
	}
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme ((curr) => (curr === "light" ? "dark" : "light"));
  }


  return (
    <Theme1context.Provider value={{theme, toggleTheme}}>
      <div className="App" id={theme}>
        
      <div className="calculator">
        <div className="display">
          <div className='switch'>
          <h1> Calculator <span> <FaGithub /></span></h1>
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
          </div>
          
          <div className='display-1'>
            { calc || "0"}
            <div className='display-result'>
                { result }
            </div>
          </div>
        </div>
        

          <div className="btn">
            <div className="btn-1">
            <button onClick={ deleteLast }>DEL</button>
            <button>AC</button>
            <button onClick={() => updateCalc('/')}>/</button>
            </div>
            
          
          <div className="numbers">
              { multiplyNumbers() }
              <button onClick={() => updateCalc('.')}>.</button>
              <button onClick={() => updateCalc('0')}>0</button>
              <button onClick={() => updateCalc('+')}>+</button>
              <button onClick={() => updateCalc('*')}>*</button>
              <button onClick={() => updateCalc('-')}>-</button>
              <button className='numbers-btn' onClick={ calculate }>=</button>
          </div>
          </div>
      </div>
    </div>
    </Theme1context.Provider>
    
  );
}

export default App;
