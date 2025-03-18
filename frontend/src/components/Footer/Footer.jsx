import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'
function Footer() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary footer-nav" >
      <Container>
        <Navbar.Text className='footer-title'>2024. AITU</Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Footer;