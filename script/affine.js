const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

function affineEncrypting(input, keyA, keyB) {
    if (GCD(keyA, keyB) === 1) {
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
          indexX = findIndex(input[i]);
          encrypt = (keyA * indexX + keyB) % 26;
          input = replaceCharAt(input, i, alphabet[encrypt]);
        }
      }
    }
    return input;
  }
  
  function affineDecrypting(input, keyA, keyB) {
    const aInverse = modularInverse(keyA, 26);
  
    if (aInverse === -1) {
      alert("Invalid keyA. Modular inverse does not exist.");
    }
  
    if (GCD(keyA, keyB) === 1) {
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
          indexX = findIndex(input[i]);
          decrypt = (((aInverse * (indexX - keyB)) % 26) + 26) % 26;
          // console.log('decrypt : ' + decrypt);
          // console.log('alphabet : ' + alphabet[decrypt]);
          input = replaceCharAt(input, i, alphabet[decrypt]);
        }
      }
    }
    return input;
  }
  
  function findIndex(input) {
    let index = 0;
    for (let i = 0; i < alphabet.length; i++) {
      if (input.toLowerCase() === alphabet[i]) {
        index = i;
        break;
      }
    }
  
    return index;
  }
  
  function replaceCharAt(x, index, value) {
    if (index > x.length - 1) {
      return x;
    }
    return x.substring(0, index) + value + x.substring(index + 1);
  }
  
  function GCD(keyA, keyB) {
    let remain;
    let result;
  
    remain = keyA % keyB;
    keyA = keyB;
    keyB = remain;
  
    if (keyB == 0) {
      result = keyA;
    } else {
      return GCD(keyA, keyB);
    }
  
    return result;
  }
  
  function modularInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    // If modular inverse doesn't exist, return -1
    return -1;
  }