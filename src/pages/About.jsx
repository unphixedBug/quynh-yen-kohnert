import { useQuery } from "react-query";
import PageTitle from "../components/PageTitle";
import StorySection from "../components/StorySection";
import Footer from "../components/Footer";
import { getStories } from "../services/wordpress";

export default function About() {
  const {
    data: stories,
    isLoading,
    error,
    refetch,
  } = useQuery("stories", getStories, {
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:pl-[103px]">
        <PageTitle className="text-dark">Mon parcours</PageTitle>
        <div className="animate-pulse space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-64 bg-slate/10 rounded-sm"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 w-3/4 bg-slate/10 rounded-sm"></div>
                <div className="h-32 bg-slate/10 rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 lg:pl-[103px]">
        <PageTitle className="text-dark">Mon parcours</PageTitle>
        <div className="text-primary bg-primary/5 p-4 rounded-sm flex flex-col items-center gap-4">
          <p>Une erreur est survenue lors du chargement des contenus.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-light rounded-sm hover:bg-primary/90 transition-colors"
          >
            Réessayer
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stories?.length) {
    return (
      <div className="container mx-auto px-4 lg:pl-[103px]">
        <PageTitle className="text-dark">Mon parcours</PageTitle>
        <div className="text-slate text-center">
          Aucun contenu n'est disponible pour le moment.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:pl-[103px]">
      <PageTitle className="text-dark">Mon parcours</PageTitle>
      <div className="max-w-7xl mx-auto">
        {stories.map((story) => (
          <StorySection key={story.id} story={story} />
        ))}
      </div>
      <section className="mb-[4.8rem]  flex flex-col items-center md:flex md:justify-around md:flex-row md:max-w-[723px] m-auto w-[100%]">
        <button className="">Me contacter</button>
        <button className="bg-light hover:bg-primary text-primary hover:text-light border-2 border-primary py-3 rounded-sm w-[60%] max-w-[200px] h-fit m-[2rem]">
          Mes Œuvres
        </button>
      </section>
      <Footer />
    </div>
  );
}
