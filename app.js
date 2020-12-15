const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello! Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We do not serve that here! Please do not call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Method: ${req.method}
    Route: ${req.route}
    Security: ${req.secure}
    Fresh: ${req.fresh}
    Stale: ${req.stale}
    Query: ${req.query}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end();
});

app.get("/greetings", (req, res) => {
  const name = req.query.name;
  const location = req.query.location;

  if (!name) {
    return res.status(400).send("Please provide a name");
  }

  if (!location) {
    return res.status(400).send("Please provide a location");
  }

  const greeting = `Greetings ${name}! Welcome to ${location} 0.`;

  res.send(greeting);
});

app.get("/sum", (req, res) => {
  const A = req.query.a;
  const B = req.query.b;

  const aNumber = (req.query.a = parseInt(req.query.a));
  const bNumber = (req.query.b = parseInt(req.query.b));

  const C = aNumber + bNumber;

  if (!A) {
    return res.status(400).send("Please provide a number for A");
  }

  if (!B) {
    return res.status(400).send("Please provide a number for B");
  }

  const sum = `The sum of ${aNumber} and ${bNumber} is ${C}`;

  console.log(sum);
  res.send(sum);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text.toUpperCase();
  const shift = req.query.shift;
  const shiftNumber = (req.query.shift = parseInt(req.query.shift));
  console.log(`Shiftnumber: ${shiftNumber}`);

  if (!text) {
    res.status(400).send("Please enter text");
  }

  if (!shift) {
    res.status(400).send("Please enter shift");
  }

  if (shift > 26 || shift < 1) {
    res.status(400).send("Please enter a number between 1 and 26");
  }

  const splitText = text.split("");

  const charCodedShiftedText = splitText.map((character) => {
    return character.charCodeAt(0) + shiftNumber;
  });

  const codedText = charCodedShiftedText.map((shiftedCharacter) => {
    if (shiftedCharacter > 90) {
      const excess = shiftedCharacter - 90;
      const newNumber = 64 + excess;
      return String.fromCharCode(newNumber);
    }
    return String.fromCharCode(shiftedCharacter);
  });

  const joinedText = codedText.join("");

  res.send(joinedText);
});

app.get("/lotto", (req, res) => {
  const selectedNumber1 = (req.query.arr[0] = parseInt(req.query.arr[0]));
  const selectedNumber2 = (req.query.arr[1] = parseInt(req.query.arr[1]));
  const selectedNumber3 = (req.query.arr[2] = parseInt(req.query.arr[2]));
  const selectedNumber4 = (req.query.arr[3] = parseInt(req.query.arr[3]));
  const selectedNumber5 = (req.query.arr[4] = parseInt(req.query.arr[4]));
  const selectedNumber6 = (req.query.arr[5] = parseInt(req.query.arr[5]));

  const selectedNumbers = [
    selectedNumber1,
    selectedNumber2,
    selectedNumber3,
    selectedNumber4,
    selectedNumber5,
    selectedNumber6,
  ];
  console.log("Selected Numbers: ", selectedNumbers);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const generatedNumbers1 = getRandomInt(1, 21);
  const generatedNumbers2 = getRandomInt(1, 21);
  const generatedNumbers3 = getRandomInt(1, 21);
  const generatedNumbers4 = getRandomInt(1, 21);
  const generatedNumbers5 = getRandomInt(1, 21);
  const generatedNumbers6 = getRandomInt(1, 21);

  const lottoNumbers = [
    generatedNumbers1,
    generatedNumbers2,
    generatedNumbers3,
    generatedNumbers4,
    generatedNumbers5,
    generatedNumbers6,
  ];

  console.log("Lotto Numbers: ", lottoNumbers);

  const results = `Lotto Numbers: ${lottoNumbers}, Your Picks: ${selectedNumbers}`;

  const checkResults = (array1, array2) => {
    let matchCount = 0;
    array1.map((generatedNumber) => {
      if (array2.includes(generatedNumber)) {
        matchCount++;
      }
    });
    console.log("Match Count: ", matchCount);

    if (matchCount < 4) {
      res.send("Sorry, you lose");
    }

    if (matchCount === 4) {
      res.send("Congratulations, you win a free ticket");
    }

    if (matchCount === 5) {
      res.send("Congratulations! You win $100!");
    }

    if (matchCount === 6) {
      res.send("You have won the mega millions!");
    }
  };

  checkResults(lottoNumbers, selectedNumbers);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
