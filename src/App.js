import React, { useState } from 'react';
import './css/appstyle.css';

function App() {
  const [getDataResult, setGetDataResult] = useState([]);
  const [postDataResult, setPostDataResult] = useState("");
  const [putDataResult, setPutDataResult] = useState("");
  const [deleteDataResult, setDeleteDataResult] = useState("");

  const getData = async () => {
    const response = await fetch('http://localhost:3000/get');
    const data = await response.json();
    setGetDataResult(data);
  };

  const postData = async () => {
    const data = document.getElementById('postData').value;
    const response = await fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    });
    const result = await response.text();
    setPostDataResult(result);
  };

  const putData = async () => {
    const id = document.getElementById('putId').value;
    const data = document.getElementById('putData').value;
    const response = await fetch('http://localhost:3000/put', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, data: data })
    });
    const result = await response.text();
    setPutDataResult(result);
  };

  const deleteData = async () => {
    const id = document.getElementById('deleteId').value;
    const response = await fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    });
    const result = await response.text();
    setDeleteDataResult(result);
  };

  return (
    <div>
      <h1>HTTP Methods Demo</h1>
      <div className='codeblock'>
        <div className='form'>
          <h3>GET Data from server</h3>
          <button onClick={getData} style={{padding:'4px', backgroundColor:'aliceblue'}}>Fetch All Data</button>
          <div style={{marginTop:'1.3vh',border:'2px dotted black',paddingLeft:'1vw'}}>
            {getDataResult.length > 0 ? (
              <pre>{JSON.stringify(getDataResult, null, 2)}</pre>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <hr/>
        <div className='form'>
          <h3>POST Data from server</h3>
          <input type="text" id="postData" placeholder="Enter data to POST"  />
          <button onClick={postData}style={{marginLeft:'2vw',padding:'4px', backgroundColor:'aliceblue'}} >Submit Data</button>
          <div>{postDataResult}</div>
        </div>
        <hr/>
        <div className='form'>
          <h3>PUT Data from server</h3>
          <input type="text" id="putId" placeholder="Enter ID to Update" style={{marginRight:'2vw'}}/>
          <input type="text" id="putData" placeholder="Enter new data"  />
          <button onClick={putData} style={{marginLeft:'2vw',padding:'4px', backgroundColor:'aliceblue'}}>Update Data</button>
          <div>{putDataResult}</div>
        </div>
        <hr/>
        <div className='form'>
          <h3>DELETE Data from server</h3>
          <input type="text" id="deleteId" placeholder="Enter ID to Delete"  />
          <button onClick={deleteData} style={{marginLeft:'2vw',padding:'4px', backgroundColor:'aliceblue'}}>Delete Data</button>
          <div>{deleteDataResult}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
