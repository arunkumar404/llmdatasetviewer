import React, { useEffect, useRef, useState } from 'react'
import '../App.css'

const DataVisualiser = ({ dataset }) => {
  const [requiredItem, setRequiredItem] = useState(null)
 const promptRef = useRef(null)
 const [isPromptOverflowing, setIsPromptOverflowing] = useState(false)

  useEffect(() => {
    setRequiredItem(dataset[0])
  }, [ dataset ] )
  
  useEffect(() => {
    checkPromptOverflow()
  }, [requiredItem]) 

  const handleIndexChange = (e) => {
    if (e.target.value) {
      setRequiredItem(dataset[e.target.value])
    } else {
      setRequiredItem(dataset[0])
    }
  }

  const formatContent = (content) => {
    if (!content) return ''
    let formattedContent = content.replace(/###/g, '<br>###')
    return formattedContent.replace(/\n/g, '<br>')
  }

  const checkPromptOverflow = () => {
    const current = promptRef.current
    if (current) {
      setIsPromptOverflowing(current.scrollHeight > current.clientHeight)
    }
  }
  return (
    <div classame='visualiserContainer'>
      <div className='dataContainer'>
        <input
          onChange={handleIndexChange}
          type='number'
          className='indexInput'
          placeholder='Type the item number you want to see here'
        />

        <div className='sampleContainer'>
          <div className='instruction itemConts'>
            {requiredItem?.instruction}
          </div>
          <div className='input itemConts'>{requiredItem?.input}</div>
          <div
            className='propmt itemConts'
            dangerouslySetInnerHTML={{
              __html: formatContent(requiredItem?.prompt),
            }}
            ref={promptRef}
            onScroll={checkPromptOverflow}
          />
          {isPromptOverflowing && (
            <div className='scrollIndicator'>Scroll to see more &#8595;</div>
          )}
          <div className='output itemConts'>{requiredItem?.output}</div>
        </div>
      </div>
    </div>
  )
}

export default DataVisualiser
