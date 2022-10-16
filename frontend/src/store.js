import {useState,createContext} from 'react'

export const MyContext = createContext(null);

export default function QuestionsCount({children}) {
    const [totalQuestions, setTotalQuestions] = useState(null)
    return(
        <MyContext.Provider value={{totalQuestions,setTotalQuestions}}>
            {children}
        </MyContext.Provider>
        )
}   
