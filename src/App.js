import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Navbar } from 'react-bootstrap';
import CryptoJS from 'crypto-js';

const App = () => {
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [textToDecrypt, setTextToDecrypt] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [useEncryptionKey, setUseEncryptionKey] = useState(false);
  const [useDecryptionKey, setUseDecryptionKey] = useState(false);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    try {
      const encrypted = useEncryptionKey
        ? CryptoJS.AES.encrypt(textToEncrypt, encryptionKey).toString()
        : CryptoJS.AES.encrypt(textToEncrypt, '').toString();
      setEncryptedText(encrypted);
      setError('');
    } catch (err) {
      setError('Error during encryption. Check your input and key.');
    }
  };

  const handleDecrypt = () => {
    try {
      const decrypted = useDecryptionKey
        ? CryptoJS.AES.decrypt(textToDecrypt, decryptionKey).toString(CryptoJS.enc.Utf8)
        : CryptoJS.AES.decrypt(textToDecrypt, '').toString(CryptoJS.enc.Utf8);
      setDecryptedText(decrypted);
      setError('');
    } catch (err) {
      setError('Error during decryption. Check your input and key.');
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Online Encryption & Decryption Tool</h1>
          <p className='mt-5'>Explore the secure communication with Encryption and Decryption Tool. Utilizing the AES encryption algorithm, users can encrypt and decrypt messages seamlessly. The tool provides flexibility with optional encryption keys, allowing users to enhance security based on their preferences. With a clean and intuitive interface, this tool is designed for both encryption novices and experts in mind.</p>
          <p>Keep your communications confidential and ensure data integrity with our Encryption and Decryption Tool—your go-to solution for privacy in the digital age.</p>

          <Form>
            <h2>Encrypt</h2>
            <Form.Group controlId="textToEncrypt">
              <Form.Label>Text to Encrypt</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={textToEncrypt}
                onChange={(e) => setTextToEncrypt(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="encryptionKey" className='mb-2'>
              <Form.Check
                type="checkbox"
                label="Use Encryption Key"
                checked={useEncryptionKey}
                onChange={() => setUseEncryptionKey(!useEncryptionKey)}
              />
              {useEncryptionKey && (
                <Form.Control
                  type="text"
                  placeholder="Enter Encryption Key"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                />
              )}
            </Form.Group>

            <Button variant="primary" onClick={handleEncrypt}>
              Encrypt
            </Button>

            {encryptedText && (
              <Form.Group controlId="encryptedText" className="mt-3">
                <Form.Label>Encrypted Text</Form.Label>
                <Form.Control type="text" value={encryptedText} readOnly as="textarea" rows={5} />
              </Form.Group>
            )}

            <hr />

            <h2>Decrypt</h2>
            <Form.Group controlId="textToDecrypt">
              <Form.Label>Text to Decrypt</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={textToDecrypt}
                onChange={(e) => setTextToDecrypt(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="decryptionKey" className='mb-3'>
              <Form.Check
                type="checkbox"
                label="Use Decryption Key"
                checked={useDecryptionKey}
                onChange={() => setUseDecryptionKey(!useDecryptionKey)}
              />
              {useDecryptionKey && (
                <Form.Control
                  type="text"
                  placeholder="Enter Decryption Key"
                  value={decryptionKey}
                  onChange={(e) => setDecryptionKey(e.target.value)}
                />
              )}
            </Form.Group>

            <Button variant="info" onClick={handleDecrypt}>
              Decrypt
            </Button>

            {decryptedText && (
              <Form.Group controlId="decryptedText" className="mt-3 mb-4">
                <Form.Label>Decrypted Text</Form.Label>
                <Form.Control type="text" value={decryptedText} readOnly as="textarea" rows={5} />
              </Form.Group>
            )}

            {error && <Alert variant="danger" className="mt-3 mb-5">{error}</Alert>}
          </Form>
        </Col>
      </Row>

      <Navbar fixed="bottom" className="bg-body-tertiary">
        <Container className="justify-content-end">
          <Navbar.Text >
            Developed By: <a href="https://d2devs.github.io">D2Devs</a>
          </Navbar.Text>
        </Container>
      </Navbar>
    </Container >
  );
};

export default App;
