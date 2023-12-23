import React, { useState } from 'react'

const FileInput = () => {
  const [jsonData, setJsonData] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result)
          setJsonData(json)
          console.log(json)
        } catch (error) {
          console.error('Error parsing JSON:', error)
          setJsonData(null)
        }
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a valid JSON file.')
    }
  }

  return (
    <div>
      <input
        type='file'
        accept='application/json'
        onChange={handleFileChange}
      />
      {jsonData && (
        <div>
          <h3>JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default FileInput
