

document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.querySelector('.start-page');
    const quizContainer = document.querySelector('.quiz-container');
    const btnStart = document.getElementById('btn-start');
    btnStart.addEventListener('click', () => {
        startPage.style.display = 'none';
        quizContainer.style.display = 'block';
    });
    
});


/* all answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* all our options */      
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');


let indexOfQuestion, // index текущего вопроса 
indexOfPage = 0; // идекс страниці 

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score = 0; //result of qwiz

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');


const questions = [
    {
        question: 'What is the capital of France?',
        options: [
            'Paris',
            'Berlin',
            'Madrid',
            'Rome',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which city serves as the capital of Brazil?',
        options: [
            'Buenos Aires',
            'Sao Paulo',
            'Rio de Janeiro',
            'Brasilia',
        ],
        rightAnswer: 2
    },
    {
        question: 'What is the capital of Australia?',
        options: [
            'Melbourra',
            'Sydney',
            'Wellington',
            'Canberra',
        ],
        rightAnswer: 3
    },
    {
        question: 'What is the capital of Japan?',
        options: [
        'Seoul',
        'Beijing',
        'Tokyo',
        'Osaka',
        ],
        rightAnswer: 2
        },

        {
            question: 'What is the capital of the Netherlands?',
            options: [
                'Amsterdam',
                'Rotterdam',
                'The Hague',
                'Utrecht',
            ],
            rightAnswer: 0
        },
        {
            question: 'What is the capital of Ukraine?',
            options: [
                'Kiev',
                'Lviv',
                'Odessa',
                'Kharkiv',
            ],
            rightAnswer: 0
        },
        {
            question: 'What is the capital of Iceland?',
            options: [
                'Reykjavik',
                'Akureyri',
                'Hafnarfjordur',
                'Kopavogur',
            ],
            rightAnswer: 0
        },
        {
            question: 'What is the capital of the United States?',
            options: [
                'New York',
                'Washington, D.C.',
                'Los Angeles',
                'Chicago',
            ],
            rightAnswer: 1
        },
        {
            question: 'What is the capital of Canada?',
            options: [
                'Toronto',
                'Vancouver',
                'Ottawa',
                'Montreal',
            ],
            rightAnswer: 2
        },
        {
            question: 'What is the capital of Spain?',
            options: [
                'Barcelona',
                'Madrid',
                'Valencia',
                'Seville',
            ],
            rightAnswer: 1
        }
    ];    

numberOfAllQuestion.innerHTML = questions.length; //количество всех вопросов 

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос 
    
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
     // Устанавливаем номер текущей страницы
    indexOfPage++;
   
};

let completedAnswers = [];


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
} else {
    if(completedAnswers.length > 0) {
        completedAnswers.forEach(item => {
            if(item == randomNumber) {
                hitDuplicate = true;
            }
        });
    if (hitDuplicate) {
        randomQuestion();
    } else {
        indexOfQuestion = randomNumber;
        load();
           }
       };
       if (completedAnswers == 0) {
        indexOfQuestion = randomNumber;
        load();
       }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');

    }
    disabledOptions();   //добавить в конце как рещение проблемы 
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');

    })

};


const answerTracker = () => {
    questions.forEach(() =>  {
        const div = document.createElement('div');
        answersTracker.appendChild(div);

    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);

};

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('You need to choose one of the options');
    } else {
        randomQuestion();
        enableOptions();

    }
}; 

btnNext.addEventListener('click', validate);

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));

}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();

};

btnTryAgain.addEventListener('click', tryAgain);

    window.addEventListener('load', () => {
        randomQuestion();
        answerTracker();


    })

    

   