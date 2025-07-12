import AuthenticatedHome from './components/home';

const renderedAt = new Date();
  const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  const renderedAtString = `${formattedBuildDate} at ${formattedBuildTime}`;

  
export default function HomePage() {
  
  return <AuthenticatedHome renderedAt={renderedAtString} />;
}