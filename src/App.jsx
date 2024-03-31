import { Suspense } from "react";
import Experience from "./canvas/Experience";
import Section1 from "./components/section1";
import Section2 from "./components/Section2";

function App() {
  return (
    <div className="main w-full bg-black">
      <div className="h-screen w-full fixed top-0 bg-black z-10 pointer-events-none">
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </div>
      <Section1 />
      <Section2 />
    </div>
  );
}

export default App;
