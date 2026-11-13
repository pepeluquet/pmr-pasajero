import { SiteHeader } from './components/SiteHeader';
import { ChecklistSection, ComplaintsSection, HeroSection, JourneySection, QuizSection, RightsSection, SiteFooter, SourcesSection, WheelchairSection } from './components/GuideSections';
import { guide } from './content/guide';

// Página única: el orden de los componentes sigue el orden en que el pasajero
// prepara el viaje, y tiene que coincidir con el orden del menú (guide.navigation).
function App() {
  return (
    <>
      <a className="skip-link" href="#contenido" data-testid="link-skip-content">{guide.accessibility.skip}</a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <HeroSection />
        <QuizSection />
        <RightsSection />
        <ChecklistSection />
        <JourneySection />
        <WheelchairSection />
        <ComplaintsSection />
        <SourcesSection />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
