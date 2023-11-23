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


function handleCipherEncrypt() {
  let selectedCipher = cipherSelect.value;
  let keyA = Number(inputA.value);
  let keyB = Number(inputB.value);
  let input = inputUser.value;

  if ((keyA === "" || keyB === "") && selectedCipher != "rot13") {
    alert("Fill the key A and the key B");
    return;
  }

  let result;

  switch (selectedCipher) {
    case "affine":
      result = affineEncrypting(input, keyA, keyB);
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

  if ((keyA === "" || keyB === "") && selectedCipher != "rot13") {
    alert("Fill the key A and the key B");
    return;
  }

  let result;

  switch (selectedCipher) {
    case "affine":
      result = affineDecrypting(input, keyA, keyB);
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
  let selectedCipher = cipherSelect.value;
  if (selectedCipher === "rot13") {
    inputA.disabled = true;
    inputB.disabled = true;
    titleCipher.innerHTML = "ROT13 Cipher";
  } else if (selectedCipher === "affine") {
    inputA.disabled = false;
    inputB.disabled = false;
    titleCipher.innerHTML = "Affine Cipher";
  } else if (selectedCipher === "affine_rot13") {
    inputA.disabled = false;
    inputB.disabled = false;
    titleCipher.innerHTML = "Affine then Rot 13";
  } else if (selectedCipher === "rot13_affine") {
    inputA.disabled = false;
    inputB.disabled = false;
    titleCipher.innerHTML = "Rot 13 then affine";
  }
}
