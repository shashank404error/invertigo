console.log("inside content.js");

function addBionicTagsToParagraphV2(paragraph) {
    const fragment = document.createDocumentFragment();

    paragraph.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            const words = text.split(/\s+/);

            const bionicText = words.map(word => {
                const shouldBold = word.length > 1 || Math.random() < 0.5;
                if (shouldBold) {
                    const wordLength = word.length;
                    const maxBoldLetters = Math.ceil(wordLength / 2);
                    const numBoldLetters = Math.min(maxBoldLetters, Math.ceil(Math.random() * maxBoldLetters));
                    const boldedWord = ' <b>' + word.substring(0, numBoldLetters) + '</b>' + word.substring(numBoldLetters)+' ';
                    return boldedWord;
                }else{
                    return word;
                }

            }).join(' ');

            const tempElement = document.createElement('span');
            tempElement.innerHTML = bionicText;

            while (tempElement.firstChild) {
                fragment.appendChild(tempElement.firstChild);
            }
        } else {
            fragment.appendChild(node.cloneNode(true));
        }
    });

    paragraph.innerHTML = '';

    paragraph.appendChild(fragment);
}

function addBionicTagsToLiV2(liElement) {
    const fragment = document.createDocumentFragment();

    liElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            const wordsWithPunctuation = text.match(/\S+\b\s*/g);

            if (Array.isArray(wordsWithPunctuation)) {
            wordsWithPunctuation.forEach(word => {
                const shouldBold = word.length > 1 || Math.random() < 0.5;
                if (shouldBold) {
                    const wordLength = word.length;
                    const maxBoldLetters = Math.ceil(wordLength / 2);
                    const numBoldLetters = Math.min(maxBoldLetters, Math.ceil(Math.random() * maxBoldLetters));

                    const firstHalf = word.substring(0, numBoldLetters);
                    const secondHalf = word.substring(numBoldLetters);

                    const boldFirstHalf = document.createElement('b');
                    boldFirstHalf.textContent = firstHalf;

                    fragment.appendChild(boldFirstHalf);
                    fragment.appendChild(document.createTextNode(secondHalf));
                }
            });
        } else{
            return;
        }
        } else {
            fragment.appendChild(node.cloneNode(true));
        }
    });
        liElement.innerHTML = '';
        liElement.appendChild(fragment);
    }



    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(addBionicTagsToParagraphV2);
    
    const li = document.querySelectorAll('li');
    li.forEach(addBionicTagsToLiV2);    