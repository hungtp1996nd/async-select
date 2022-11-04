import React, { useEffect, useState } from 'react';
import './App.css';
import AsyncSelect from 'react-select/async'
import request from './apis/request';

function App() {
  const [items, setItems] = useState<any>([])
  const [keyProjects, setKeyProjects] = useState<string>('')
  const loadOptions = (value: string, callback: (options: any) => void) => {
    request.get('/items').then(data => {
      const newData = (data.data || [])?.map((item: any) => ({
        value: item.name, 
        label: item.name,
        id: item.id
      }))
      callback(newData)
    })
  }
  const loadProjects = (value: string, callback: (options: any) => void) => {
    console.log(items, keyProjects)
    request.get(`/projects?itemId=${items[0]?.id}`).then(data => {
      const newData = (data.data || [])?.map((item: any) => ({
        value: item.name, 
        label: item.name
      }))
      callback(newData)
    })
  }
  useEffect(() => {
    let keys = ''; 
    (items || [])?.forEach((item: any) => {
      keys = keys + item.name
    })
    setKeyProjects(keys)
  }, [items])
  return (
    <div className="App">
      <AsyncSelect 
        isMulti
        value={items}
        onChange={setItems}
        cacheOptions={true}
        loadOptions={loadOptions}
        defaultOptions={true} 
      />
      <AsyncSelect 
        isMulti
        key={keyProjects}
        cacheOptions={true}
        loadOptions={loadProjects}
        defaultOptions={true} 
      />
    </div>
  );
}

export default App;
