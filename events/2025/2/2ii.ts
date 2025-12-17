const solver = (input: string): string | number => {
  const ranges = input.split(',').map((line) => line.split('-').map((x) => +x));

  let sum = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      const id = i.toString();

      for (let repetitions = 2; repetitions <= id.length; repetitions++) {
        if (id.length % repetitions === 0) {
          const l = id.length / repetitions;
          let isInvalid = true;
          for (let rep = 0; rep < repetitions - 1; rep++) {
            if (
              id.slice(l * rep, l * (rep + 1)) !==
              id.slice(l * (rep + 1), l * (rep + 2))
            ) {
              isInvalid = false;
            }
          }

          if (isInvalid) {
            sum += i;
            break; // so one number is not counted multiple times
          }
        }
      }
    }
  }

  return sum;
};

export default solver;
