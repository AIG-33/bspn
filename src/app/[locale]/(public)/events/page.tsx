import { PageHeader } from "@/components/sections/page-header";
import { getEvents } from "@/lib/queries/events";
import { EventsClient } from "./events-client";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        title="Мероприятия"
        description="Конференции, семинары, тренинги и бизнес-миссии — расширяйте связи и знания вместе с БСПН"
      />
      <EventsClient initialData={events} />
    </>
  );
}
