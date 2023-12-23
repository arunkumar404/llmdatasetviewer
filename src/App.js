import './App.css'
import DataVisualiser from './components/DataVisualiser';
import dataset from './new_dataset.json'

function App() {
  console.log(dataset);
  return (
    <div className='app'>
      <DataVisualiser dataset={dataset} />
    </div>
  )
}

export default App
