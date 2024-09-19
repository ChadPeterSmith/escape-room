import HomePage from "./components/HomePage";
import Image from "next/image"


export default function Home() {
  return (
   <main>
    <Image
     src="/nextjs-github-pages/vercel.svg"
     alt="Vercel Logo"
     width={100}
     height={24}
     priority
   />
    <HomePage />
   </main>
  );
}
