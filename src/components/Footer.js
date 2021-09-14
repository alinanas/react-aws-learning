import React, { useEffect, useState } from 'react';
// import footerLinksData from './data/footer-links.json'

const Footer = () => {
  const [footerLinksData, setFooterLinksData] = useState([]);

  const loadFooterLinksData = async() => {
    // Query the API Gateway
    const resp = await fetch('https://c591gsmu61.execute-api.us-east-1.amazonaws.com/Productions/footerlinks');
    let jsonData = await resp.json();

    // Assign response data to our state variable
    setFooterLinksData(jsonData);
  }

  useEffect(() => {
    // Load the menu links data from the API Gateway
    loadFooterLinksData();
  }, []);

    return (
        <footer className="scene">  
          <article className="content">
            <div id="socialmedia">
              <ul className="group">
                {
                  footerLinksData.map((link) =>
                    <li key={link.href}><a href={link.href}><img className="icon" src={link.src} alt={link.alt}/></a></li>
                  )
                }
              </ul>      
            </div>
          </article>
        </footer>
    );
}

export default Footer;