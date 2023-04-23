const input = "123456789 + 22  33 33 0";
function isNumeric(c) {
  return "0" <= c && c <= "9";
}
function* lexer(str) {
  let cursor = 0;
  let char = str[cursor];
  let column = 1;
  let line = 1;
  
  function next() {
    cursor++;
    char = str[cursor];

    column++
  }

  function newline() {
    if (char === "\n") {
        next();
        line++;
        column = 1;
      }
}

  function number() {
    let buffer = "";
    while (isNumeric(char)) {
      buffer += char;
      next();
    }

    if (buffer.length >= 1) {
      return {
        type: "number",
        value: Number(buffer),
      };
    }

    return null;
  }

  function whitespace() {
    while (char === " " || char === "\t") {
     next();
    }
  }

  function eof() {
    //char = str[cursor];
    //cursor++;
    next();
    if (char === undefined) {
      return {
        type: "EOF",
      };
    }

    return null;
  }

  function eol() {
    if (char === "\n") {
      next();
      newline();
    } else {
      return null;
    }

    while (char === "\n") {
      next();
      newline();
    }
    return true;
  }
// dlaczego to nie dziala?!!??
function operator() {
  whitespace();
  while (char === '+'){
    next();
    return {
      type: 'PlusToken',
      value: '+',
    }
  }
  return null;
}


// function operator() { a to juz dziala ale dziala bez sensu
//   whitespace();
//   while (char === '+'){
//     next();
//   }
//   return {
//     type: 'PlusToken',
//     value: '+',
//   }
// }

  for (;;) {
    // this while(true)
   
    const token =  whitespace() || number() || eof() || eol() || operator()// features are arranged by frequency of use

    if (token) {
      yield token;

      if (token.type === "EOF") {
        break;
      }
    } else {
      throw new SyntaxError( `unexpected character ${char} at${line}:${column}`);
    }
  }
}

console.log("start");
for (const token of lexer(input)) {
  // console.log([...lexer(input)])
  console.log(token);
}
console.log("finish");