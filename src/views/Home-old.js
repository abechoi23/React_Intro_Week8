import { useState } from "react";
import Counter from "../components/Counter";

export default function Home() {
  const [counters, setCounters] = useState([
    {
      title: "Pushup Counter",
      initialCount: 0,
    },
    {
      title: "Situp Counter",
      initialCount: 4010,
    },
    {
      title: "Squat Counter",
      initialCount: 110,
    },
  ]);

  return (
    <div className="App">
      {counters.map((counter) => (
        <Counter title={counter.title} initialCount={counter.initialCount} />
      ))}
    </div>
  );
}
