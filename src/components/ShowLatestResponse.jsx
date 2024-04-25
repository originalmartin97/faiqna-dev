import { useLatestResponses } from '../hooks/useLatestResponses'
import { Parser } from '../utils/Parser'
import QnA from './QnA'


const ShowLatestResponse = () => {
    const responses = useLatestResponses();
    const response = responses[0];
    console.log(response)

    if (!response || typeof response.content !== 'string') {
        return <div>Loading...</div>; // return a loading state or a default value
    }

    const responseLines = response.content
    const task = Parser(responseLines)
    console.log(task)
    const qna = <QnA lines={task}></QnA>;

    return qna;
};

export default ShowLatestResponse