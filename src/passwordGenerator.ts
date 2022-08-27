
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

function generatePassword(settings: PasswordSettings) {
    let charset = '';
    if(settings.uppercase){
        charset += upperLetters;
    }
    if(settings.lowercase){
        charset += lowerLetters;
    }
    if(settings.numbers){
        charset += numbers;
    }
    if(settings.symbols){
        charset += symbols;
    }
    let password = '';
    for (let i = 0, n = charset.length; i < settings.length; i++){
        password += charset.charAt(Math.floor(Math.random() * n))
    }
    return password;
}

export { PasswordSettings, generatePassword }