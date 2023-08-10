import React from 'react'
import appstore from "../../../images/Appstore.png";
import playstore from "../../../images/playstore.png";
import "./footer.css";
import { FaSquareGithub } from 'react-icons/fa6';
import{FaLinkedinIn} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa';
import { ImLinkedin } from 'react-icons/im';
import { FaInstagram } from 'react-icons/fa6';
import{GrLinkedin} from 'react-icons/gr'


const footer = () => {
  const linkedinStyle = {
    background: 'white',  

    color: '#0A66C2',
    borderBlock: 'auto',

  };

  const githubStyle = {
    color: 'white',
    // background: 'white', 
    borderBlock: 'none',
    margin: 'none'
  };

  const instagramStyle = {
    // background: '#bc2a8d'
     color: '#bc2a8d'
  };
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>DOWNLOAD APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={appstore} alt='Appstore' />
        <img src={playstore} alt='Playstore' />

      </div>

      <div className='midFooter'>
        <h1>Ecommerce.</h1>
        <p>High Quality is my first priority</p>
        <p>Copyrights 2023 &copy; iChandanKr </p>

      </div>

      <div className='rightFooter'>
        <h4>Follow Me</h4>
        {/*<a href='https://www.linkedin.com/in/chandan-kumar-0ab518212'>linkedin</a>*/}
        <a href='https://www.linkedin.com/in/chandan-kumar-0ab518212'>{<ImLinkedin style={linkedinStyle} />}</a>

        {/*<a href='https://github.com/iChandanKr'>github</a></footer>*/}
        <a href='https://github.com/iChandanKr'>{<FaGithub style={githubStyle} />}</a>

        {/* <a href='https://instagram.com/_chandan62_?igshid=MzNlNGNkZWQ4Mg=='>instagram</a>*/}
        <a href='https://instagram.com/_chandan62_?igshid=MzNlNGNkZWQ4Mg=='>{<FaInstagram style={instagramStyle} />}</a>


      </div>


    </footer>
  )
}

export default footer