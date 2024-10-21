import HackthonList from "@/components/HackthonList";
import Image from "next/image";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <div>
      <Landing />
      <HackthonList/>
    </div>
  );
}
