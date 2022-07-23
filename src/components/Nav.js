import { useState } from "react"
import Github from "../icons/github"
import "./nav.css"


const Nav = ()=>{
    const [darkMode, setDarkMode] = useState(true)

    return <div id='nav'>
        <a className="icon" target="_blank" href="https://github.com/fluxit000/Wordle-PL">
            <Github color={darkMode?"white":"black"} size={35}/>
        </a>
        <div id="title">Wordle PL</div>
        <span className="material-symbols-outlined dark-mode-icon icon" onClick={darkMode? 
            ()=>{
                document.documentElement.style.setProperty('--dark-font',"black")
                document.documentElement.style.setProperty('--background-color',"white")
                setDarkMode(false)
            }:
            ()=>{
                document.documentElement.style.setProperty('--dark-font',"rgb(197, 197, 197)")
                document.documentElement.style.setProperty('--background-color',"rgb(53, 53, 53)")
                setDarkMode(true)
            }
        }
        >{darkMode? "dark_mode": "light_mode"} </span>
        
    </div>
}

export default Nav