import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import PortfolioNavbar from './sections/PortfolioNavbar';
import PortfolioFooter from './sections/PortfolioFooter';

const Portfolio = ({ portfolio, isPreview = false }) => {
  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No portfolio data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isPreview && <PortfolioNavbar portfolio={portfolio} />}

      <main>
        <About data={portfolio.personalInfo} />
        {portfolio.skills?.length > 0 && <Skills data={portfolio.skills} />}
        {portfolio.experience?.length > 0 && (
          <Experience data={portfolio.experience} />
        )}
        {portfolio.education?.length > 0 && <Education data={portfolio.education} />}
        {portfolio.projects?.length > 0 && <Projects data={portfolio.projects} />}
        <Contact data={portfolio.contact} />
      </main>

      {!isPreview && <PortfolioFooter portfolio={portfolio} />}
    </div>
  );
};

export default Portfolio;