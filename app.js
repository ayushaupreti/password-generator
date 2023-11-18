const app = () => {
    const numCharacters = document.querySelector(".characters")
    const specialChars = document.querySelector(".specialChars")
    const nums = document.querySelector(".nums")
    const password = document.querySelector(".password")
    const message = document.querySelector(".message")

    const submit = document.querySelector(".submit")

    const breakIntoParts = (num, parts) =>
        [...Array(parts)].map((_, i) => 0 | num / parts + (i < num % parts))
    
    const generatePassword = (numChars, includeSpecialChars, includeNums) => {
        const alphaChar = "abcdefghijklmnopqrstuvwxysABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').sort(() => 0.5 - Math.random()).join('');
        const numChar = "0123456789".split('').sort(() => 0.5 - Math.random()).join('');
        const specialChar = "(~!@#$%^&*_-+=`|\(){}[]:;\"'<>,.?/)".split('').sort(() => 0.5 - Math.random()).join('');
        let generatedPassword = ""

        let numberOfAlphaChars;
        let numberOfNumChars;
        let numberOfSpecialChars;
        let split;
        if(includeSpecialChars && includeNums){
            split = breakIntoParts(numChars, 3)
            numberOfAlphaChars = split[0]
            numberOfNumChars = split[1]
            numberOfSpecialChars = split[2]
        }else if(includeSpecialChars && !includeNums){
            split = breakIntoParts(numChars, 2)
            numberOfAlphaChars = split[0]
            numberOfNumChars = 0
            numberOfSpecialChars = split[1]
        } else if (!includeSpecialChars && includeNums) {
            split = breakIntoParts(numChars, 2)
            numberOfAlphaChars = split[0]
            numberOfNumChars = split[1]
            numberOfSpecialChars = 0
        } else{
            numberOfAlphaChars = numChars
            numberOfSpecialChars = 0
            numberOfNumChars = 0
        }

        // alphas
        for (var i = 0; i < numberOfAlphaChars; i++){
            generatedPassword += alphaChar.charAt(Math.floor(Math.random() * alphaChar.length));
        }
        // nums
        for (var i = 0; i < numberOfNumChars; i++) {
            generatedPassword += numChar.charAt(Math.floor(Math.random() * numChar.length));
        }
        // specials
        for (var i = 0; i < numberOfSpecialChars; i++) {
            generatedPassword += specialChar.charAt(Math.floor(Math.random() * specialChar.length));
        }

        return generatedPassword.split('').sort(() => 0.5 - Math.random()).join('')
    }

    submit.addEventListener('click', () => {
        if(numCharacters.value != 0){
            const generatedPassword = generatePassword(numCharacters.value, specialChars.checked, nums.checked)
            password.textContent = generatedPassword
            message.textContent = "Click to copy"
        } else{
            message.textContent = "Please specify the number of characters"
        }
    })

    password.addEventListener('click', () => {
        navigator.clipboard.writeText(password.textContent);
        
        console.log("Copied the text: " + password.textContent);
    })
}

app()