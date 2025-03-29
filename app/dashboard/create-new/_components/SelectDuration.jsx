import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectDuration = ({ onUserSelect }) => {
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Duration</h2>
      <p className="text-gray-600">Select the Duration of video</p>
      <Select
        onValueChange={value => {
          value != 'Custom Prompt' && onUserSelect('duration', value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="In seconds" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30 secs">30 Seconds</SelectItem>
          <SelectItem value="60 secs">60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
