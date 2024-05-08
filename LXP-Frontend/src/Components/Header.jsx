import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import "../Styles/Header.css"



function navbar(){
    return(
        <Navbar className="bg-body-tertiary" id='Admin-bar' >
        <Container  className="justify-content-end">
        <Nav>
            <Nav.Link href="#home"  ><SearchIcon style={{ fill: "white" }}  sx={{ fontSize: 30 }} /></Nav.Link>
            <NavDropdown  title={<AddIcon style={{ fill: "white" }}  sx={{ fontSize: 30 }} />} id="basic-nav-dropdown" className="dropdown" > 
              <NavDropdown.Item href="#action/3.1">Add Course</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Add Quiz</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home"><NotificationsNoneIcon style={{ fill: "white" }}  sx={{ fontSize: 30 }} /></Nav.Link>
            <Avatar src="/broken-image.jpg" />
            </Nav>
        </Container>
      </Navbar>
    )
}

export default navbar
