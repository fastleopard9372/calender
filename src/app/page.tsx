import Image from "next/image";
import Calender from "./pages/calender";
import Header from "@/app/layout/header";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <Calender />
    </div>
  );
}
