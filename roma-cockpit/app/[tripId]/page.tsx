import { notFound } from "next/navigation";
import { travelData } from "@/data/travelData";
import CockpitApp from "@/components/CockpitApp";

// Auth model = the (non-guessable) trip id in the URL. We only render content
// for the known trip; any other id 404s rather than leaking an empty shell.
export default async function TripPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  if (tripId !== travelData.tripId) notFound();
  return <CockpitApp data={travelData} />;
}
