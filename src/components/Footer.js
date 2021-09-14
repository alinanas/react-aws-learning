import React from 'react';
import footerLinksData from './data/footer-links.json'

const Footer = () => {
    return (
        <footer className="scene">  
          <article className="content">
            <div id="socialmedia">
              <ul className="group">
                {
                  footerLinksData.map((links) =>
                    <li><a href={links.href}><img className="icon" src={links.src} alt={links.alt}/></a></li>
                  )
                }
              </ul>      
            </div>
          </article>
        </footer>
    );
}

export default Footer;