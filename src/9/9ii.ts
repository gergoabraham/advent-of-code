const solver = (input: string): string | number => {
  const files = generateLinkedList(input);

  for (let id = files.length - 1; id >= 0; id--) {
    const fileToMove = files[id];

    const moveAfterThis: File | null = findWhereToMove(files, fileToMove);
    if (!moveAfterThis) continue;

    remove(fileToMove);
    insert(fileToMove, moveAfterThis);
  }

  return calculateChecksum(files);
};

type File = {
  id: number;
  startIndex: number;
  size: number;
  nextFile: File | null;
  prevFile: File | null;
};

const generateLinkedList = (input: string) => {
  const discMap = input.split("").map((x) => +x);

  const files: File[] = [];
  let prevFile: File | null = null;

  for (let i = 0; i < discMap.length; i += 2) {
    const file: File = {
      id: i / 2,
      startIndex: prevFile
        ? prevFile.startIndex + prevFile.size + discMap[i - 1]
        : 0,
      size: discMap[i],
      prevFile,
      nextFile: null,
    };

    if (prevFile) {
      prevFile.nextFile = file;
    }

    files.push(file);

    prevFile = file;
  }

  return files;
};

const findWhereToMove = (files: File[], fileToMove: File) => {
  let freeSpace = 0;
  let fileA: File | null = files[0];

  while (
    freeSpace < fileToMove.size &&
    fileA &&
    fileA.startIndex < fileToMove.startIndex
  ) {
    let fileB = fileA.nextFile;
    if (!fileB) break;

    freeSpace = fileB.startIndex - (fileA.startIndex + fileA.size);
    fileB = fileB.nextFile;
    fileA = fileA.nextFile;
  }

  if (freeSpace < fileToMove.size || !fileA) return null;

  return fileA.prevFile!;
};

const calculateChecksum = (files: File[]) => {
  let checksum = 0;
  let file: File | null = files[0];

  while (file) {
    const { startIndex, size } = file;
    const endIndex = startIndex + size - 1;

    checksum += ((file.id * (startIndex + endIndex)) / 2) * size;

    file = file.nextFile;
  }

  return checksum;
};

const remove = (fileToMove: File) => {
  const afterFile = fileToMove.nextFile;
  const beforeFile = fileToMove.prevFile;

  if (afterFile) {
    afterFile.prevFile = beforeFile;
  }

  if (beforeFile) {
    beforeFile.nextFile = afterFile;
  }
};

const insert = (fileToMove: File, moveAfterThis: File) => {
  const moveBeforeThis = moveAfterThis?.nextFile;

  moveAfterThis.nextFile = fileToMove;

  if (moveBeforeThis) {
    moveBeforeThis.prevFile = fileToMove;
  }

  fileToMove.startIndex = moveAfterThis.startIndex + moveAfterThis.size;
  fileToMove.nextFile = moveBeforeThis;
  fileToMove.prevFile = moveAfterThis;
};

export default solver;
