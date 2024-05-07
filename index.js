const readline = require('readline');

// генерируем секретное число из 4 неповторяющихся цифр
function generateSecretNumber() {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    numbers.sort(() => Math.random() - 0.5); // перемешиваем массив с цифрами
    let secretNumber = '';
    for (let i = 0; i < 4; i++) {
        secretNumber += numbers[i]; // создаем секретное число
    }
    return secretNumber;
}

// проверяем угаданные числа
function checkGuess(secretNumber, guess) {
    let bulls = 0; // подсчитываем быков
    let cows = 0; // подсчитываем коров
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretNumber[i]) {
            bulls++; // смотрим если нужная цифра угадана и стоит на правильном месте, то увеличиваем кол-во быков
        } else if (secretNumber.includes(guess[i])) {
            cows++; // смотрим, если нужная цифра угадана, но стоит не на том месте, то увеличиваем кол-во коров
        }
    }
    return [bulls, cows];
}


function playGame() {
    let secretNumber = generateSecretNumber();
    let attempts = 0;

    console.log("Welcome to the game Bulls and Cows!");
    console.log("The computer set a 4-digit number. Try to guess it.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your guess: ', (guess) => {
        if (guess.length !== 4 || !/^\d{4}$/.test(guess)) {
            console.log("Please enter a 4-digit number.");
        } else {
            let [bulls, cows] = checkGuess(secretNumber, guess);
            console.log(`Bulls: ${bulls}, Cows: ${cows}`);
            attempts++;

            if (bulls === 4) {
                console.log(`Congratulations! You guessed the number '${secretNumber}' in ${attempts} attempts.`);
                rl.close();
            } else {
                rl.close();
                playGame();
            }
        }
    });
}

playGame();