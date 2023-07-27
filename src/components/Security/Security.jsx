import { useContext, useState, Fragment } from 'react';

import CipherContext from '../store/cipher-context';

import './Security.css';

const Security = () => {
  const cipherCtx = useContext(CipherContext);

  const [ plainText, setPlainText ] = useState('');

  const plainTextHandler = (event) => {
    setPlainText(event.target.value);
  };

  const decryptHandler = () => {
    cipherCtx.decryptFunction(cipherCtx.incryptedText, cipherCtx.cipherAlphabetArrays);
  };

  const clearDataHandler = () => {
    cipherCtx.clearData();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (/[,.\/;'0-9]/.test(plainText)) {
      return;
    }

    cipherCtx.incryptFunction(plainText);
  };

  const content = !cipherCtx.incryptedText && !cipherCtx.decryptedText ? (<form onSubmit={submitHandler}>
    <input type="text" id="form" placeholder="Enter plain text" onChange={plainTextHandler} />
    <button>Ecrypt Me</button>
    </form>) : cipherCtx.incryptedText && !cipherCtx.decryptedText ? (<Fragment>
          <div>
            {cipherCtx.incryptedText}
          </div>
          <button
            onClick={decryptHandler}
          >
            Decrypt Me
          </button>
        </Fragment>) : cipherCtx.incryptedText && cipherCtx.decryptedText && (<Fragment>
          <div>
            {cipherCtx.decryptedText}
          </div>
          <button
            onClick={clearDataHandler}
          >
            Encrypt Text Again?
          </button>
        </Fragment>);

    return (
      <div className='card'>
        <h1>Title Here</h1>
        { content }
      </div>
    );
};

export default Security;