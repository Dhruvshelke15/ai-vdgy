import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">AI APP GEN</h1>
      <Button>Click</Button>
      <UserButton />
    </div>
  );
}
