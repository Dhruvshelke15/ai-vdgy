'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

function SelectTopic({ onUserSelect }) {
  const options = [
    'Custom Prompt',
    'Random AI Story',
    'Scary Story',
    'Fantasy World',
    'Bedtime Story',
    'Mystery Story',
  ];
  const [selectedOptions, setSelectedOptions] = useState();
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-gray-600">What topic would you like your video on?</p>
      <Select
        onValueChange={value => {
          setSelectedOptions(value);
          value != 'Custom Prompt' && onUserSelect('topic', value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOptions == 'Custom Prompt' && (
        <Textarea
          className="mt-4"
          onChange={e => onUserSelect('topic', e.target.value)}
          placeholder="Write your own prompt!"
        />
      )}
    </div>
  );
}

export default SelectTopic;
