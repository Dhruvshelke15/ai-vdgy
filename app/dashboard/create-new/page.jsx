'use client';
import React, { useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CreateLoader from './_components/CreateLoader';
import { v4 as uuidv4 } from 'uuid';

const scriptData =
  "London, 1888. Fog hangs heavy. Detective Harding is called to Blackwood Manor - a place now shrouded in more than just mist. Inside, opulence disturbed. The famed 'Crimson Tear' ruby, priceless and legendary, is gone. Vanished without a trace. No forced entry, no witnesses. Just this: a strange silver locket, dropped carelessly, bearing an unfamiliar crescent insignia. The insignia isn't random. Harding delves into forgotten lore, seeking connections to secret societies and shadowed histories. The trail leads not to a brute, but to Mr. Abernathy, the frail historian consulted earlier. The locket is his family's sigil. Driven by obsession, Abernathy sought to reclaim a family 'legacy'. The Crimson Tear is recovered, the mystery closed... for now.";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    GenerateAudio(scriptData);
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
        // console.log(res.data.result);
        setVideoScript(res.data.result);
        GenerateAudio(res.data.result);
      });
    setLoading(false);
  };

  const GenerateAudio = async videoScriptData => {
    setLoading(true);

    let script = '';
    const id = uuidv4();
    // videoScriptData.forEach(item => {
    //   script = script + item.contentText + ' ';
    // });

    // console.log(script);
    await axios
      .post('/api/gen-audio', {
        text: videoScriptData,
        id: id,
      })
      .then(res => {
        console.log(res.data);
        setAudioUrl(res.data.result);
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
