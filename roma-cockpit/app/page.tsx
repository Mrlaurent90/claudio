import { redirect } from "next/navigation";
import { travelData } from "@/data/travelData";

// The root simply forwards to the trip URL. With a single trip this keeps the
// canonical, non-guessable id in the address bar.
export default function Home() {
  redirect(`/${travelData.tripId}`);
}
