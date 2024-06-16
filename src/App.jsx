import './App.css'
import Window from './Components/Window'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

function App() {

  return (
    <>
      <DarkModeProvider>
        <AuthContextProvider>
            <Window />
        </AuthContextProvider>
      </DarkModeProvider>
    </>
  )
}

export default App
