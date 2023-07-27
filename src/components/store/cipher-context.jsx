import React from "react";

const CipherContext = React.createContext({
    incryptedText: '',
    decryptedText: '',
    cipherAlphabetArrays: [],
    incryptFunction: (plainText) => {},
    decryptFunction: (cipherText, cipherAlphabetArrays) => {},
    clearData: () => {}
});

export default CipherContext;