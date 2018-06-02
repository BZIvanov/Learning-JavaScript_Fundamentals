function letters(str) {
    Array.from(str).forEach((s, i) => console.log(`str[${i}] -> ${s}`));
}

letters("Hello, World!")