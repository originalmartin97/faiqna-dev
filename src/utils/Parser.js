export function Parser(lines) {
    if (typeof lines !== 'string') {
        console.log('Response is not a string');
        return [];
    }
    const pieces = lines.split(/\n\n/);
    const tasks = pieces.map(piece => {
        const taskPieces = piece.split('\n');
        return {
            question: taskPieces[0],
            answer1: taskPieces[1],
            answer2: taskPieces[2],
            answer3: taskPieces[3]
        };
    });

    return tasks;
}