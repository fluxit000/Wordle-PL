import { useState } from "react"
import Github from "../icons/github"
import "./footer.css"
import MaterialIcon from 'material-icons-react';


const Footer = ()=>{
    const [darkMode, setDarkMode] = useState(true)

    return <div id='footer'>
        <a className="logo" target="_blank" href="https://github.com/fluxit000/Wordle-PL">
            <Github color="var(--dark-font)" size={35}/>
        </a>
        <div id="title">Wordle PL</div>
        <span className="material-symbols-outlined dark-mode-icon" onClick={darkMode? 
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

export default Footer