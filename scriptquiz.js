/* script.js - Quiz Pedro e Inês (Opção A: 1 pergunta por página) */

const quiz = [
  {
    q: "1. Porque razão Dom Afonso IV decidiu casar o infante Pedro com Constança Manuel?",
    a: [
      "Para unir Portugal com França",
      "Para fortalecer alianças diplomáticas com Castela",
      "Para evitar conflitos internos na corte",
      "Porque Constança era a única pretendente disponível"
    ],
    c: 1
  },
  {
    q: "2. Quem era Inês de Castro antes de conhecer Pedro?",
    a: [
      "Uma princesa castelhana",
      "Filha de um duque francês",
      "Dama de companhia de Constança Manuel",
      "Uma poetisa famosa da época"
    ],
    c: 2
  },
  {
    q: "3. Em que local Pedro e Inês encontraram o refúgio ideal para viver a paixão proibida?",
    a: ["Lisboa", "Porto", "Coimbra, no Paço de Santa Clara", "Évora"],
    c: 2
  },
  {
    q: "4. Quantos filhos Pedro teve com Inês?",
    a: ["Dois", "Três", "Quatro", "Cinco"],
    c: 2
  },
  {
    q: "5. Qual era o grande medo político que levou à condenação de Inês?",
    a: [
      "Que Inês se tornasse rainha oficialmente",
      "Que a família Castro influenciasse Pedro e Portugal ficasse sob influência castelhana",
      "Que o povo se revoltasse contra Pedro",
      "Que o Papa interviesse"
    ],
    c: 1
  },
  {
    q: "6. Quem executou Inês de Castro?",
    a: [
      "Três homens enviados pelo rei: Pero Coelho, Álvaro Gonçalves e Diogo Lopes Pacheco",
      "Soldados estrangeiros",
      "Nobres da corte de Pedro",
      "Um único algoz"
    ],
    c: 0
  },
  {
    q: "7. Que gesto vingativo e simbólico Pedro tomou após ser coroado rei?",
    a: [
      "Proibiu Castela de entrar em Portugal",
      "Mandou punir os assassinos de Inês arrancando-lhes o coração",
      "Mandou destruir o Palácio de Coimbra",
      "Criou leis para abolir execuções"
    ],
    c: 1
  },
  {
    q: "8. O que diz a lenda sobre a coroação póstuma de Inês?",
    a: [
      "Nunca aconteceu",
      "Inês foi coroada viva, antes da execução",
      "Pedro mandou que a corte ajoelhasse diante dela e beijasse-lhe a mão",
      "Inês foi coroada apenas simbolicamente, sem cerimonial"
    ],
    c: 2
  },
  {
    q: "9. Porque é que os túmulos de Pedro e Inês no Mosteiro de Alcobaça estão colocados frente a frente?",
    a: [
      "Para simbolizar a reconciliação com Afonso IV",
      "Para seguir uma tradição funerária medieval",
      "Para que se encontrem face a face no Dia do Juízo Final",
      "Por razões estéticas"
    ],
    c: 2
  },
  {
    q: "10. Qual destas frases se tornou símbolo da lenda?",
    a: ["Para sempre teu", "Eterno será o nosso amor", "Inês é morta", "Nunca te esquecerei"],
    c: 2
  }
];

let current = 0;
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
let score = 0; // contador de respostas corretas


function loadQuestion() {
  const item = quiz[current];
  questionEl.textContent = item.q;
  answersEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  nextBtn.style.display = "none";

  item.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(btn, i === item.c, item));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(btn, isCorrect, item) {
  // desativar outros botões de resposta
  const all = answersEl.querySelectorAll("button");
  all.forEach(b => (b.disabled = true));

  if (isCorrect) {
    btn.classList.add("correct");
    feedbackEl.innerHTML = "<div class='feedback-box'>✔ Resposta correta!</div>";
    score++; // incrementar pontuação
  } else {
    btn.classList.add("wrong");
    // destacar resposta correta também
    const correctIndex = item.c;
    const buttons = answersEl.querySelectorAll("button");
    if (buttons[correctIndex]) buttons[correctIndex].classList.add("correct");
    feedbackEl.innerHTML = `<div class='feedback-box'>✖ Errado! A resposta certa era: "${item.a[item.c]}"</div>`;
  }

  // mostrar botão próximo
  nextBtn.style.display = "inline-block";
}


// avançar para próxima pergunta ou terminar
nextBtn.addEventListener("click", () => {
  current++;
  if (current >= quiz.length) {
    // fim do quiz
    const box = document.querySelector(".quiz-box");
    box.innerHTML = `
      <div class="end">Fim do Quiz!</div>
      <div class="end">Acertaste ${score} de ${quiz.length} perguntas.</div>
    `;
  } else {
    loadQuestion();
  }
});


// iniciar
loadQuestion();
