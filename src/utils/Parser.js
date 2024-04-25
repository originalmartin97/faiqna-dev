

export function Parser(lines) {
    // Split the response string into pieces
    if (typeof lines !== 'string') {
        console.log('Response is not a string');
    }
    const pieces = lines.split(/\n|\n\n/);

    // Create a new Task object with the pieces
    const task = {
        question: pieces[0],
        answer1: pieces[1],
        answer2: pieces[2],
        answer3: pieces[3]
    };

    return task;
}
