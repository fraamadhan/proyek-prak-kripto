let inputUser = document.getElementById("input_text");

let resultHtml = document.getElementById("result");
const btnEncrypt = document.getElementById("encrypt");
const btnDecrypt = document.getElementById("decrypt");
const cipherSelect = document.getElementById("cipherSelect");
const inputA = document.getElementById("inputA");
const inputB = document.getElementById("inputB");
const titleCipher = document.getElementById("title-cipher");
btnEncrypt.addEventListener("click", handleCipherEncrypt);
btnDecrypt.addEventListener("click", handleCipherDecrypt);
cipherSelect.addEventListener("change", handleCipherSelect);


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

function handleCipherEncrypt() {
  let selectedCipher = cipherSelect.value;
  let keyA = Number(inputA.value);
  let keyB = Number(inputB.value);
  let input = inputUser.value;

  if (keyA === "" || keyB === "") {
    alert("Fill the key A and the key B");
    return;
  }

  let result;

  switch (selectedCipher) {
    case "affine":
      result = affineEncrypting(input, keyA, keyB);
      console.log(result);
      break;
    case "rot13":
      result = rot13(input);
      break;
    case "affine_rot13":
      result = affineEncrypting(rot13(input), keyA, keyB);
      break;
    case "rot13_affine":
      result = rot13(affineEncrypting(input, keyA, keyB));
      break;
    default:
      alert("Invalid cipher selection");
      return;
  }

  resultHtml.innerHTML = result;
}

function handleCipherDecrypt() {
  let selectedCipher = cipherSelect.value;
  let keyA = Number(document.getElementById("inputA").value);
  let keyB = Number(document.getElementById("inputB").value);
  let input = inputUser.value;

  if (keyA === "" || keyB === "") {
    alert("Fill the key A and the key B");
    return;
  }

  let result;

  switch (selectedCipher) {
    case "affine":
      result = affineDecrypting(input, keyA, keyB);
      console.log(result);
      break;
    case "rot13":
      result = rot13(input);
      break;
    case "affine_rot13":
      result = affineDecrypting(rot13(input), keyA, keyB);
      break;
    case "rot13_affine":
      result = rot13(affineDecrypting(input, keyA, keyB));
      break;
    default:
      alert("Invalid cipher selection");
      return;
  }

  resultHtml.innerHTML = result;
}

function handleCipherSelect() {
  let selectedCipher = cipherSelect.value
  if (selectedCipher === "rot13") {
    inputA.disabled = true;
    inputB.disabled = true;
    titleCipher.innerHTML = "ROT13 Cipher";
  } else if(selectedCipher === "affine"){
      inputA.disabled = false;
      inputB.disabled = false;
      titleCipher.innerHTML = "Affine Cipher";
  } else if(selectedCipher === "affine_rot13") {
      titleCipher.innerHTML = "Affine then Rot 13";
  } else if (selectedCipher === "rot13_affine") {
      titleCipher.innerHTML ="Rot 13 then affine";
  }
}


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
