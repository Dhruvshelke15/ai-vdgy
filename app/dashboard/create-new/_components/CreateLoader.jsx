import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CreateLoader = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <VisuallyHidden>
          <AlertDialogTitle className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialogTitle>
        </VisuallyHidden>
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image
            src="/loading.gif"
            alt="loader"
            unoptimized={true}
            width={100}
            height={100}
          />
          <h2>Video Generation in progress... Do not refresh!</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLoader;
