import React, { useState } from "react";

import CipherContext from "./cipher-context";

const lowerPlainAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const CipherProvider = (props) => {
    const [ cipherData, setCipherData ] = useState('');
    const [ decryptedData, setDecryptedData ] = useState('');
    const [ cipherArray, setCipherArray ] = useState([]);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };

    const incryptHandler = (plainText) => {
        const upperPlainAlphabet = lowerPlainAlphabet.map((letter) => letter.toUpperCase());

        const plainTextArray = Array.from(plainText); // convert sa array

        let tempCipherText = plainTextArray.map((letter) => {
            if (letter === ' ') {
                return letter.charCodeAt(0);
            }

            let tempLetter = letter.charCodeAt(0) + 3

            if (tempLetter > 122) {
                tempLetter = tempLetter - 122; // lower case
                return tempLetter = 97 + (tempLetter - 1);
            } else if (tempLetter > 90 && tempLetter < 97) {
                tempLetter = tempLetter - 90; // upper case
                return tempLetter = 65 + (tempLetter - 1);
            } else {
                return tempLetter; // For numbers and special chars remain same as it is not a valid char
            }
        });

        const lowerCase = shuffleArray(lowerPlainAlphabet);
        const upperCase = lowerCase.map((letter) => letter.toUpperCase());

        tempCipherText = tempCipherText.map(num => {
            let letter = String.fromCharCode(num);

            if (letter === ' ') {
                return letter;
            }

            if (letter === letter.toLowerCase()) {
              const indexOfArrayLetter = lowerPlainAlphabet.indexOf(letter);
              return `${lowerCase[indexOfArrayLetter]}`;
            } else if (letter === letter.toUpperCase()){
                const indexOfArrayLetter = upperPlainAlphabet.indexOf(letter);
                return `${upperCase[indexOfArrayLetter]}`;
            } else {
                return letter;
            }
          });

        const cipherText = tempCipherText.toString().replace(/,/g, '');

        setCipherData(cipherText);
        setCipherArray({
            lowerCase,
            upperCase
        })
    };

    const decryptHandler = (cipherText, cipherAlphabetArrays) => {
        const upperPlainAlphabet = lowerPlainAlphabet.map((letter) => letter.toUpperCase());

        let cipherTextArray = Array.from(cipherText);

        cipherTextArray = cipherTextArray.map(letter => {

            if (letter === ' ') {
                return letter;
            }

            if (letter === letter.toLowerCase()) {
              const indexOfArrayLetter = cipherAlphabetArrays.lowerCase.indexOf(letter);
              return `${lowerPlainAlphabet[indexOfArrayLetter]}`;
            } else if (letter === letter.toUpperCase()){
                const indexOfArrayLetter = cipherAlphabetArrays.upperCase.indexOf(letter);
                return `${upperPlainAlphabet[indexOfArrayLetter]}`;
            } else {
                return letter;
            }
          });

          console.log(cipherTextArray);

          cipherTextArray = cipherTextArray.map((letter) => {
            if (letter === ' ') {
                return String.fromCharCode(letter.charCodeAt(0));
            }

            let tempLetter = letter.charCodeAt(0) - 3;

            console.log(tempLetter);

            if (tempLetter < 65 && !(tempLetter > 90)) {
                console.log('punasok dito');
                return tempLetter = String.fromCharCode(tempLetter + 26); // upper case
            } else if (tempLetter < 97 && !(!tempLetter > 122) && !(tempLetter < 90)) {
                return tempLetter = String.fromCharCode(tempLetter + 26); // lower case
            } else {
                return  String.fromCharCode(tempLetter); 
            }
        });

        const decryptedText = cipherTextArray.toString().replace(/,/g, '');

        console.log(decryptedText);

        setDecryptedData(decryptedText);
    };

    const clearDataHandler = () => {
        setCipherData('');
        setDecryptedData('');
    }

    const cipherContext = {
      incryptedText: cipherData,
      decryptedText: decryptedData,
      cipherAlphabetArrays: cipherArray,
      incryptFunction: incryptHandler,
      decryptFunction: decryptHandler,
      clearData: clearDataHandler
    };
    
    return (
        <CipherContext.Provider value={cipherContext}>
            { props.children }
        </CipherContext.Provider>
    )
};

export default CipherProvider