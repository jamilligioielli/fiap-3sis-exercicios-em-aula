/** Mudança de background */
function changeMainBackgroundColor() {
	const element = document.getElementById('main');
	if (element) {
		element.style.setProperty('background-color', '#000');
	}
}

function appendNewElementWithTextContent(parentElId, elTag, textValue) {
	const parentEl = document.getElementById(parentElId);
	const newEl = document.createElement(elTag);
	newEl.textContent = textValue;
	parentEl.appendChild(newEl);
}

/** Adicionando elementos a lista */
function addListElements() {
  const addElementForm = document.getElementById('addElement');
  if (addElementForm) {
    addElementForm.addEventListener('submit', event => {
      event.preventDefault();
      const wordInput = document.getElementById('word').value;

      appendNewElementWithTextContent('randomWordsList', 'li', wordInput);
    });
  }
}

/** Removendo elementos da lista com doubleclick */
function removeListElements() {
  const wordslistElements = document.querySelectorAll('#randomWordsList li');
  if (wordslistElements.length > 0) {
  const wordsListContainer = document.getElementById('randomWordsList');
  wordslistElements.forEach(el => {
    el.addEventListener('dblclick', event => {
      event.preventDefault();
      wordsListContainer.removeChild(el);
    });
  });
  } 
}


async function getMessageFromMockableIo() {
  const apiURL = "http://demo0475534.mockable.io/a1-exercicio4-jamilli";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Message API Unavailable`);
    }

    const jsonValue = await response.json();
    if (jsonValue) {
      const mensagem = jsonValue["mensagem"];
      appendNewElementWithTextContent("mockableMsg", "div", mensagem);
    }

  } catch (error) {
    console.error(error)
  } 
}

function validateRequiredFields(field, fieldErrorEl) {
  field.addEventListener('focusout', () => {
		if (!field.value) {
			fieldErrorEl.style.setProperty('display', 'block');
		} else {
			fieldErrorEl.style.setProperty('display', 'none');
		}
	});

	field.addEventListener('input', () => {
		if (field.value) {
			fieldErrorEl.style.setProperty('display', 'none');
		}
	});
}

async function postFormDataToMockableIo(nomeValue, emailValue) {
	const apiURL = 'http://demo0475534.mockable.io/a1-exercicio5-jamilli';

	try {
    const response = await fetch(apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nome: nomeValue,
				email: emailValue
			})
		});
    
		const jsonValue = await response.json();
    if (jsonValue) {
      console.log(jsonValue)
			appendNewElementWithTextContent('mockablePost', 'div', 'Dados enviados com sucesso!');
		}
	} catch (error) {
		console.error(error);
	}
}


function sendDataToMockableIo() {
  const mockablePostForm = document.getElementById('mockablePostForm');
  const nameInputContainer = document.querySelector('#mockablePostForm #nome');
  const nameInput = nameInputContainer.children[0];
  const nameInputErr = nameInputContainer.children[1];
  const emailInputContainer = document.querySelector(
			'#mockablePostForm #email'
   );
  const emailInput = emailInputContainer.children[0];
  const emailInputErr = emailInputContainer.children[1];

  validateRequiredFields(nameInput, nameInputErr);
  validateRequiredFields(emailInput, emailInputErr);

	if (mockablePostForm) {
		mockablePostForm.addEventListener('submit', event => {
			event.preventDefault();
      
      postFormDataToMockableIo(nameInput.value, emailInput.value);

		});
	}
}

async function getUserListFromMockableIo() {
  const apiURL = "http://demo0475534.mockable.io/dados-tabela-jamilli";
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Message API Unavailable`);
    }

    const jsonValue = await response.json();
    if (jsonValue) {
      return jsonValue;
    }

  } catch (error) {
    console.error(error)
  } 
}

function createNewTableWithMockableIoData() {
  const data = getUserListFromMockableIo();
  console.log(data);
  // Dai cria a tabela aqui
}



/** Chamadas das funções */
addListElements();
removeListElements();
getMessageFromMockableIo();
sendDataToMockableIo();
createNewTableWithMockableIoData();