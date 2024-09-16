let screen = "start";
let score = 0;
let currentQuestionIndex = 0;
let correct = false;

const questions = [
  { question: "What is a market?", options: { A: "A: A public \npark", B: "B: A place where \ngoods are\n bought and\n sold", C: "C: A financial \ntrading platform", D: "D: An online \nstore" }, correct: "B", explanation: "A market is a place where goods and services are bought and sold." },
  { question: "What is a stock?", options: { A: "A: A type \nof savings \naccount", B: "B: A share in the \nownership \nof a company", C: "C: A physical \nstore location", D: "D: A government\n bond" }, correct: "B", explanation: "A stock represents ownership in a company and constitutes a claim on part\n of the company’s assets and earnings." },
  { question: "What is a bond?", options: { A: "A: A digital \nasset", B: "B: A type of \ncurrency", C: "C: A loan taken \nby an organization \nto raise funds", D: "D: A share of \nownership \nin a company" }, correct: "C", explanation: "A bond is a fixed income instrument that\nrepresents a loan made by an investor to a borrower." },
  { question: "What is investment banking?", options: { A: "A: A method\nof stock\n trading", B: "B: A type \nof savings \naccount", C: "C: A loan\n provided \nby banks \nto individuals", D: "D: Helps companies \nraise capital and \nprovides advisory\n services" }, correct: "D", explanation: "Investment banking involves helping companies raise capital,\n providing advisory services, and assisting with mergers and acquisitions." },
  { question: "What is asset management?", options: { A: "A: Managing\n corporate finances", B: "B: A type of\n loan offered\n by banks", C: "C: Managing\n investments on\n behalf of clients", D: "D: Trading stocks\n and \nbonds" }, correct: "C", explanation: "Asset management involves managing investments on\n behalf of clients to help them achieve their financial goals." },
  { question: "What is corporate finance?", options: { A: "A: Analyzing\nstock market\n trends", B: "B: Providing\n loans\n to individuals", C: "C: Managing a\n company's funding,\n capital structure,\n and financial\n strategies", D: "D: Managing \nindividual\n investment\n portfolios" }, correct: "C", explanation: "Corporate finance involves managing a\n company's funding, capital structure, and financial strategies." },
  { question: "What is commercial banking?", options: { A: "A: Advisory\n services\n for mergers and\n acquisitions", B: "B: Managing\n corporate\n investments", C: "C: Banking services\n provided to\n businesses and\n individuals,\n including \nloans and\n deposits", D: "D: Investment \nbanking \nservices" }, correct: "C", explanation: "Commercial banking involves providing banking services such as\n loans, deposits, and other financial services to businesses and individuals." },
  { question: "What is wealth management?", options: { A: "A: Stock trading\n and investment\n advisory", B: "B: Offering loans\n and credit to \nindividuals", C: "C: Providing\n financial planning\n and investment\n management for\n high-net-worth\n individuals", D: "D: Managing \na company's \nfinances" }, correct: "C", explanation: "Wealth management involves providing comprehensive \nfinancial planning and investment management services to high-net-worth individuals." }
];

function setup() {
  createCanvas(700, 400);
  setupButtons();
}

function draw() {
  background(screen === "start" ? '#F5B7B1' :
              screen === "quiz" ? '#A2D9CE' :
              screen === "score" ? '#F9E79F' :
              '#D6A4A4');

  if (screen === "start") drawStartScreen();
  else if (screen === "quiz") drawQuizScreen();
  else if (screen === "score") drawScoreScreen();
  else if (screen === "learn") drawLearnScreen();
}

function setupButtons() {
  buttons = {
    startButton: createButton("Start"),
    restartButton: createButton("Restart"),
    nextQuestionButton: createButton("Next"),
    A: createButton("A"),
    B: createButton("B"),
    C: createButton("C"),
    D: createButton("D")
  };

  buttons.startButton.position(width / 2 - 50, height / 2 - 20).size(100, 40).mousePressed(() => { currentQuestionIndex = 0; screen = "quiz"; });
  buttons.restartButton.position(width - 120, 60).size(100, 40).mousePressed(resetGame).hide();
  buttons.nextQuestionButton.position(width - 120, height - 60).size(100, 40).mousePressed(nextQuestion).hide();

  ["A", "B", "C", "D"].forEach(option => {
    buttons[option].size(100, 40).mousePressed(() => checkAnswer(option)).hide();
  });
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(0);
  text("Invest in Your Future", width / 2, height / 2 - 100);

  // Add rules text
  textSize(16);
  text("Rules:\n1. Select the correct answer for each question.\n2. Earn points for each correct answer.\n3. Click 'Start' to begin.", width / 2, height / 2 + 60);

  buttons.startButton.show();
  hideAllOtherButtons();
}

function drawQuizScreen() {
  const q = questions[currentQuestionIndex];
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text(q.question, width / 2, 80);

  const buttonWidth = 100;
  const buttonHeight = 40;
  const optionSpacing = 20;
  const totalWidth = buttonWidth * 4 + optionSpacing * 3;
  const startX = width / 2 - totalWidth / 2;
  const startY = height / 2 + 70;

  textSize(16);
  ["A", "B", "C", "D"].forEach((option, index) => {
    text(q.options[option], startX + 44 + index * (buttonWidth + optionSpacing), startY - 100);
    buttons[option].position(startX + index * (buttonWidth + optionSpacing), startY).show();
  });

  buttons.nextQuestionButton.hide();
  buttons.restartButton.show();
  buttons.startButton.hide();
}

function drawScoreScreen() {
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(0);
  text(`Score: ${score}`, width / 2, height / 2 - 100);
  textSize(16);
  text("Click to Restart", width / 2, height / 2);

  ["A", "B", "C", "D"].forEach(option => buttons[option].hide());

  buttons.restartButton.show();
  buttons.nextQuestionButton.hide();
  buttons.startButton.hide();
}

function drawLearnScreen() {
  const q = questions[currentQuestionIndex];
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text(correct ? "Correct!" : "Incorrect!", width / 2, 100);
  textSize(16);
  text(`Explanation: ${q.explanation}`, width / 2, height / 2);

  buttons.nextQuestionButton.show();
  buttons.restartButton.show();
  buttons.startButton.hide();
}

function hideAllOtherButtons() {
  ["A", "B", "C", "D"].forEach(option => buttons[option].hide());
  buttons.restartButton.hide();
  buttons.nextQuestionButton.hide();
}

function checkAnswer(option) {
  const q = questions[currentQuestionIndex];
  correct = option === q.correct;
  screen = "learn";
  if (correct) score++;
}

function nextQuestion() {
  currentQuestionIndex++;
  screen = currentQuestionIndex >= questions.length ? "score" : "quiz";
}

function resetGame() {
  score = 0;
  currentQuestionIndex = 0;
  screen = "start";
  buttons.restartButton.hide();
}
