
import { Home,Expenses,Header } from './components'
import { Routes,Route } from 'react-router-dom'
import { Incomes } from './components/Incomes'

function App() {

  return (
  <>
 <Header />
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/incomes" element={<Incomes />} />
  <Route path="/expenses" element={<Expenses />} />
  
 </Routes>
  </>
  )
}

export default App
