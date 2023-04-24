//yield" is a keyword that is used in a generator function to pause the execution of a function and return a value to the caller.
//The generator function can then be resumed from where it left off with the next call to the function.
// * after function creating Generator
const input = "123456789 + 22 - 33 33 0";
function isNumeric(c) {
  return "0" <= c && c <= "9";
}
export function* lexer(str) {
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
// dlaczego to nie dziala?!!?? już działa
function operator() {
  if (char === '+'){
    next();
    return {
      type: 'PlusToken',
      value: '+',
    }
    
  } else if (char === '-'){
    next();
    return {
      type: 'MinusToken',
      value: '-',
    }
  } else if (char === '*') {
    next();
    return {
      type: 'MultiplyToken',
      value: '*',
    }
  } else if (char === '/') {
    next();
    return {
      type: 'DividToken',
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

  while (true) {
    // for(;;) this is the same something new!
   
    const token =  whitespace() || number() || operator() || eof() || eol() // features are arranged by frequency of use

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