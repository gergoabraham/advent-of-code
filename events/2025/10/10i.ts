const solver = (input: string): string | number => {
  const machines = input.split('\n').map((line) => {
    const items = line.split(' ');

    let lightDiagramBinary = 0;
    const lightDiagram = items[0].slice(1, -1).split('');
    for (let i = 0; i < lightDiagram.length; i++) {
      if (lightDiagram[i] === '#') {
        lightDiagramBinary |= 1 << i;
      }
    }

    return {
      lightDiagram: lightDiagramBinary,
      buttonMasks: items.slice(1, -1).map((buttonGroup) =>
        buttonGroup
          .slice(1, -1)
          .split(',')
          .map((x) => +x)
          .reduce((mask, button) => mask | (1 << button), 0)
      ),
    };
  });

  return machines
    .map(({ lightDiagram, buttonMasks }) =>
      traverseSolutions(lightDiagram, buttonMasks)
    )
    .reduce((sum, num) => sum + num);
};

const traverseSolutions = (
  targetDiagram: number,
  buttonsToPress: number[],
  currentDiagram: number = 0
): number => {
  if (buttonsToPress.length === 0) {
    if (currentDiagram === targetDiagram) {
      return 0;
    } else {
      return Infinity;
    }
  }

  const [currentButton, ...remainingButtonsToPress] = buttonsToPress;
  const solutionWithPressedButton = traverseSolutions(
    targetDiagram,
    remainingButtonsToPress,
    currentDiagram ^ currentButton
  );
  const solutionWithNotPressedButton = traverseSolutions(
    targetDiagram,
    remainingButtonsToPress,
    currentDiagram
  );

  return Math.min(solutionWithPressedButton + 1, solutionWithNotPressedButton);
};

export default solver;
