import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './css.components/Welcome.css';


function Welcome() {
  const [show, setShow] = useState(true);

  if (show) {

    return (
      <Alert variant="success" className='shadow' id='welcome-alert' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Hey, nice to see you, Welcome to the Books React application!</Alert.Heading>
        <p>
          This is a simple app to manage your book collection.
        </p>
        <hr />
        <p className="mb-0">
          Enjoy your reading journey!
        </p>
      </Alert>
    );
  }
      return <Button className='bg-info mt-3 border-0 ' onClick={() => setShow(true)}>Show Alert</Button>;
  }


  export default Welcome;


