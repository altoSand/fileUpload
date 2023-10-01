import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, Heading, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const API_BASE_URL = 'http://localhost:8000';
  const selectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let zipData = e.target.files
    if (zipData && zipData[0]) { 
      setFile(zipData[0])
    }
  }
  const fileUpload = () => {
    if(file) {
      const formData = new FormData();
      formData.append('file', file);
      axios({
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: API_BASE_URL+'/upload',
        data: formData,
        withCredentials: true
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    } 
  }

  return (
    <Flex justify='center' align='center' h='100vh'>
      <Card align='center'>
        <CardHeader>
          <Heading size='md'>ファイルアップロード</Heading>
        </CardHeader>
        <CardFooter>
          <input type='file' accept='application/zip' onChange={selectFile}/>
          <Button colorScheme='blue' onClick={fileUpload}>アップロード</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}

export default App;
