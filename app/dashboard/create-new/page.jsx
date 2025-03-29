'use client';
import React, { useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CreateLoader from './_components/CreateLoader';

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      'Write a script to generate a ' +
      formData.duration +
      ' video on Topic: "' +
      formData.topic +
      '" with an AI image prompt in ' +
      formData.style +
      ' format for each scene and give me the output in JSON format with imagePrompt and contentText as fields\n\n';
    console.log(prompt);

    const result = await axios
      .post('/api/get-video-script', {
        prompt: prompt,
      })
      .then(res => {
        console.log(res.data.result);
        setVideoScript(res.data.result);
      });
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New Video
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CreateLoader loading={loading} />
    </div>
  );
}

export default CreateNew;
