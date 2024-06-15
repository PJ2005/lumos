import './App.css'
import Window from './Components/Window'
import { AuthContextProvider } from './context/AuthContext.jsx'

function App() {

  return (
    <>
      <AuthContextProvider>
        <Window />
      </AuthContextProvider>
    </>
  )
}

export default App
