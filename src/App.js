import React from 'react';
import './App.css';

// components
import Navcol from './components/navcol'
import Chatplace from './components/chatplace'

// libraries
import { Route } from 'react-router-dom' 
import { Container, 
         Row,
         Col} from 'reactstrap'

const App = () => {
  return (
    <div>

      {/* if logged in (got token) */}
      <Container fluid={true}>
        <Row>
          <Col md='3' xs='12' style={{padding:'0vw', backgroundColor:'rgb(238, 238, 238)'}}>
            <Route path='/' component={Navcol} />
          </Col>

          <Col md='9' xs='12' style={{padding:0}}>
            <Route path='/' component={Chatplace} />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
