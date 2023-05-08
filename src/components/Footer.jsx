import React from 'react';

 function Footer(){
    const currentYear=new Date().getFullYear();
    return <footer>
        <p>Copyright &copy;Ketan Chouhan {currentYear}</p>
    </footer>
        
    
 }
 export default Footer;