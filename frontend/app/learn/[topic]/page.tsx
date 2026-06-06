import LearnClient from "./LearnClient";

export default async function LearnTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return <LearnClient topic={topic} />;
}
