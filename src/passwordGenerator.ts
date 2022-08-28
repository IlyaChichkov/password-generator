
class PasswordSettings{
    uppercase!: boolean;
    lowercase!: boolean;
    numbers!: boolean;
    symbols!: boolean;
    length!: number;
}

const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*';

function RandomRange(min: number, max: number){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePassword(settings: PasswordSettings) {
    let typesCount = 0;

    if(settings.uppercase){
        typesCount++;
    }
    if(settings.lowercase){
        typesCount++;
    }
    if(settings.numbers){
        typesCount++;
    }
    if(settings.symbols){
        typesCount++;
    }

    const letterTypes = [];
    const letterPerType = Math.floor(settings.length / typesCount);
    const additionalLettersCount = settings.length - letterPerType * typesCount;

    if(settings.uppercase){
        letterTypes.push({
            typeChars: upperLetters,
            lettersCount: letterPerType
        })
    }
    if(settings.lowercase){
        letterTypes.push({
            typeChars: lowerLetters,
            lettersCount: letterPerType
        })
    }
    if(settings.numbers){
        letterTypes.push({
            typeChars: numbers,
            lettersCount: letterPerType
        })
    }
    if(settings.symbols){
        letterTypes.push({
            typeChars: symbols,
            lettersCount: letterPerType
        })
    }
    console.log(letterTypes)
    console.log(additionalLettersCount)
    let password = '';
    for (const letterType of letterTypes) {
        for (let i = 0; i < letterType.lettersCount; i++) {
            const charId = Math.floor(Math.random() * letterType.typeChars.length);
            password += letterType.typeChars.charAt(charId);
        }
    }
    console.log(password)
    for (let i = 0; i < additionalLettersCount; i++) {
        console.log('adding')
        console.log(letterTypes)
        const letterType = letterTypes[RandomRange(0, typesCount - 1)];
        console.log(letterType)
        const charId = Math.floor(Math.random() * letterType.typeChars.length);
        password += letterType.typeChars.charAt(charId);
    }
    password = shuffleString(password);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const zxcvbn = require('zxcvbn');
    const score = zxcvbn(password).score;
    return {password, score};
}

// 3-d Party Shuffle Function
function shuffleString(string: string) {
// Create a copy of the original string to be randomized ['A', 'B', ... , 'G']
    const shuffle = [...string];

// Shuffle a pair of two elements at random position j (Fisher-Yates)
    shuffle.forEach( (elem, i, arr, j = RandomRange(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    return shuffle.join('');
}

export { PasswordSettings, generatePassword }