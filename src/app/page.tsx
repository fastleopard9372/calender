import Image from "next/image";
import Calender from "./pages/calender";
import MenuBar from "./components/menuBar";
import Header from "@/app/layout/header";
import CreateDialog from "./components/createDialog";
export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <Calender />
      <CreateDialog />
      {/* <MenuBar /> */}
    </div>
  );
}
