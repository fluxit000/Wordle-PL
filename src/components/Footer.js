import Github from "../icons/github"
import "./footer.css"

const Footer = ()=>{
    return <div id='footer'>
        <a className="logo" target="_blank" href="https://github.com/fluxit000/Wordle-PL">
            <Github color="var(--dark-font)" size={35}/>
        </a>
        <div id="title">Wordle PL</div>
    </div>
}

export default Footer