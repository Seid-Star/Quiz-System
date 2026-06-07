let questions = [
    {
        numb: 1,
        question: "What does console.log() do?",
        answer: "A) Shows output in console",
        options: [
            "A) Shows output in console",
            "B) Deletes data",
            "C) Creates a variable",
            "D) Adds numbers"
        ]
    },
    {
        numb: 2,
        question: "What is the output of 2 + 3?",
        answer: "B) 5",
        options: [
            "A) 23",
            "B) 5",
            "C) 6",
            "D) 3"
        ]
    },
    {
        numb: 3,
        question: "Which keyword is used to create a variable?",
        answer: "C) var / let / const",
        options: [
            "A) return",
            "B) function",
            "C) var / let / const",
            "D) class"
        ]
    },
    {
        numb: 4,
        question: "What is the output?\n\nlet x = 10;\nconsole.log(x);",
        answer: "D) 10",
        options: [
            "A) error",
            "B) x",
            "C) undefined",
            "D) 10"
        ]
    },
    {
        numb: 5,
        question: "What does Math.round(4.6) return?",
        answer: "A) 5",
        options: [
            "A) 5",
            "B) 4",
            "C) 4.6",
            "D) 6"
        ]
    },
    {
        numb: 6,
        question: 'What is the output?\n\nconsole.log("Hello" + "World");',
        answer: "B) HelloWorld",
        options: [
            "A) Hello World",
            "B) HelloWorld",
            "C) Hello+World",
            "D) Error"
        ]
    },
    {
        numb: 7,
        question: "What is an array used for?",
        answer: "A) Store multiple values",
        options: [
            "A) Store multiple values",
            "B) Store one value",
            "C) Print output",
            "D) Create function"
        ]
    },
    {
        numb: 8,
        question: "What is the output?\n\nlet arr = [10, 20, 30];\nconsole.log(arr[0]);",
        answer: "D) 10",
        options: [
            "A) undefined",
            "B) 20",
            "C) 30",
            "D) 10"
        ]
    },
    {
        numb: 9,
        question: "What does addEventListener() do?",
        answer: "B) Listens for user actions (click, etc.)",
        options: [
            "A) Deletes HTML",
            "B) Listens for user actions (click, etc.)",
            "C) Creates CSS",
            "D) Stops program"
        ]
    },
    {
        numb: 10,
        question: "What is the output?\n\nconsole.log(typeof 10);",
        answer: "B) number",
        options: [
            "A) string",
            "B) number",
            "C) boolean",
            "D) object"
        ]
    }
]
let userAnswers  = JSON.parse(localStorage.getItem("userAnswers")) || []
let userScore    = parseInt(localStorage.getItem("userScore"))     || 0
let questionCount= parseInt(localStorage.getItem("questionCount")) || 0
let unanswered   = parseInt(localStorage.getItem("unanswered"))    || 0
let correct      = parseInt(localStorage.getItem("correct"))       || 0
let wrong        = parseInt(localStorage.getItem("wrong"))         || 0
let questionNumb = questionCount + 1
let timeValue = 30
let counter
function saveProgress() {
    localStorage.setItem("userAnswers",   JSON.stringify(userAnswers))
    localStorage.setItem("userScore",     userScore)
    localStorage.setItem("questionCount", questionCount)
    localStorage.setItem("unanswered",    unanswered)
    localStorage.setItem("correct",       correct)
    localStorage.setItem("wrong",         wrong)
}
const startBtn    = document.querySelector('.start-btn')
const quizSection = document.querySelector('.quiz-section')
const quizBox     = document.querySelector('.quiz-box')
const reusltBox   = document.querySelector('.result-box')  
const tryBtn      = document.querySelector('.tryAgain-btn')
const goHomebtn   = document.querySelector('.goHome-btn')  
const goHomeResult= document.getElementById('GH')    
const nextBtn     = document.querySelector('.next-btn')
const prevBtn     = document.querySelector('.prev-btn')
const optionList  = document.querySelector('.option-list')
const timerEl     = document.getElementById('timer')
function startTimer() {
    timeValue = 30
    clearInterval(counter)
    timerEl.textContent = timeValue
    timerEl.classList.remove('warning')

    counter = setInterval(() => {
        timeValue--
        timerEl.textContent = timeValue

        if (timeValue <= 10) {
            timerEl.classList.add('warning')
        }
        if (timeValue <= 0) {
            clearInterval(counter)
            timerEl.classList.remove('warning')
            if (userAnswers[questionCount] === undefined) {
                userAnswers[questionCount] = null
                unanswered++
                saveProgress()
            }
            if (questionCount >= questions.length - 1) {
                showResultBox()
            } else {
                questionCount++
                questionNumb++
                showQuestions(questionCount)
                questionCounter(questionNumb)
                nextBtn.classList.remove('active')
                updateProgress()
                startTimer()
            }
        }
    }, 1000)
}
function updateProgress() {
    let pct = ((questionCount + 1) / questions.length) * 100;
    document.querySelector('.progress').style.width = pct + '%'
}
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total')
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}
function showQuestions(index) {
    updateProgress()
    const questionText = document.querySelector('.question-text')
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`
    let optionTag = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `
    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll('.option')
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
    if (userAnswers[index] !== undefined) {
        const savedAnswer = userAnswers[index]
        const options = document.querySelectorAll('.option')
        options.forEach(opt => {
            opt.classList.add('disabled');
            if (savedAnswer !== null && opt.textContent.trim() === savedAnswer.trim()) {
                opt.classList.add(savedAnswer === questions[index].answer ? 'correct' : 'incorrect');
            }
            if (opt.textContent.trim() === questions[index].answer.trim()) {
                opt.classList.add('correct')
            }
        })
        nextBtn.classList.add('active')
    } else {
        nextBtn.classList.remove('active')
    }
}
function optionSelected(answer) {
    if (userAnswers[questionCount] !== undefined) return
    clearInterval(counter)
    let userAnswer    = answer.textContent.trim()
    let correctAnswer = questions[questionCount].answer.trim()
    let allOptions    = optionList.children.length
    if (userAnswer === correctAnswer) {
        answer.classList.add('correct')
        userScore++
        correct++
    } else {
        answer.classList.add('incorrect')
        wrong++
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled')
    }
    for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent.trim() === correctAnswer) {
            optionList.children[i].setAttribute('class', 'option correct')
        }
    }
    userAnswers[questionCount] = userAnswer
    saveProgress()
    headerScore()
    nextBtn.classList.add('active')
}
function headerScore() {
    const headerScoreText = document.querySelector('.header')
    headerScoreText.textContent = `Score ${userScore} / ${questions.length}`
}
startBtn.onclick = () => {
    quizSection.classList.add('active')
    quizBox.classList.add('active')
    showQuestions(questionCount)
    questionCounter(questionNumb)
    headerScore()
    startTimer()
};
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++
        questionNumb++
        showQuestions(questionCount)
        questionCounter(questionNumb)
        nextBtn.classList.remove('active')
        updateProgress()
        startTimer()
    } else {
        showResultBox()
    }
};
prevBtn.onclick = () => {
    if (questionCount > 0) {
        questionCount--
        questionNumb--
        showQuestions(questionCount)
        questionCounter(questionNumb)
    }
}
tryBtn.onclick = () => {
    localStorage.clear()
    userAnswers   = []
    userScore     = 0
    questionCount = 0
    questionNumb  = 1
    unanswered    = 0
    correct       = 0
    wrong         = 0
    reusltBox.classList.remove('active')
    quizBox.classList.add('active')
    nextBtn.classList.remove('active')

    showQuestions(questionCount)
    questionCounter(questionNumb)
    headerScore()
    startTimer()
};
goHomeResult.onclick = () => {
    localStorage.clear()
    userAnswers   = []
    userScore     = 0
    questionCount = 0
    questionNumb  = 1
    unanswered    = 0
    correct       = 0
    wrong         = 0
    clearInterval(counter)
    quizSection.classList.remove('active')
    quizBox.classList.remove('active')
    reusltBox.classList.remove('active')
    nextBtn.classList.remove('active')
    headerScore()
}
goHomebtn.onclick = (e) => {
    e.preventDefault()
    localStorage.clear()
    userAnswers   = []
    userScore     = 0
    questionCount = 0
    questionNumb  = 1
    unanswered   = 0
    correct  = 0
    wrong = 0
    clearInterval(counter)
    quizSection.classList.remove('active');
    quizBox.classList.remove('active')
    reusltBox.classList.remove('active')
    nextBtn.classList.remove('active')
    headerScore()
}
function showResultBox() {
    clearInterval(counter)
    quizBox.classList.remove('active')
    reusltBox.classList.add('active')
    const scoreText = document.querySelector('.score-text')
    let percent = (userScore / questions.length) * 100
    let message = ""
    if (percent <= 40) {
        message = "Needs Improvement"
    } else if (percent <= 70) {
        message = "Good Effort"
    } else if (percent <= 90) {
        message = "Great Work"
    } else {
        message = "Excellent"
    }
    scoreText.innerHTML = `
        Correct: ${correct}
        Wrong: ${wrong}
        Unanswered: ${unanswered}<br>
        Score: ${userScore} / ${questions.length}<br>
        <strong>${message}</strong>
    `
    const circularProgress = document.querySelector('.circular-progress')
    const progressValue    = document.querySelector('.progress-value')
    let progressStartValue = -1
    let progressEndValue   = Math.round((userScore / questions.length) * 100)
    let speed = 20
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`
        if (progressStartValue<50){
        circularProgress.style.background =
            `conic-gradient(red ${progressStartValue * 3.6}deg, rgba(0, 173, 0, 0.1) 0deg)`
            }else{
                circularProgress.style.background =
            `conic-gradient(green ${progressStartValue * 3.6}deg, rgba(0, 173, 0, 0.1) 0deg)`
            }

        if (progressStartValue === progressEndValue) {
            clearInterval(progress)
        }
    }, speed)
}
headerScore()
if (userAnswers.length > 0) {
    quizSection.classList.add('active')
    quizBox.classList.add('active')
    showQuestions(questionCount)
    questionCounter(questionNumb)
    headerScore()
    if (userAnswers[questionCount] === undefined) {
        startTimer()
    }
}
 // Percentage: ${percent.toFixed(1)}%<br>