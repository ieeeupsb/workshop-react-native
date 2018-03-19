import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

interface Question {
    question: string,
    type: string,
    difficulty: Difficulty,
    correctAnswer: string,
    incorrect_answers: string[]    
}

type Difficulty = "easy" | "medium" | "hard"

enum Category {
    GENERAL_KNOWLEDGE = 9,
    GADGETS = 30,
    COMPUTERS = 18
}

export const getQuestions = async (amount: number, difficulty?: Difficulty, category?: Category) => {
    const params = {
        amount: amount,
        ...(difficulty ? {difficulty: difficulty} : {}),
        ...(category ? {category: category.valueOf()} : {})
    }

    return axios.get<Question[]>('https://opentdb.com/api.php', {params: params}).then( response => response.data)
}
    