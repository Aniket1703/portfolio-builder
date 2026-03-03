import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { portfolioService } from '../services/portfolio.service';
import Portfolio from '../components/portfolio/Portfolio';
import Loader from '../components/common/Loader';
import { useEffect } from 'react';

const PortfolioView = () => {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery(
    ['portfolio', slug],
    () => portfolioService.getPortfolioBySlug(slug),
    {
      retry: false,
    }
  );

  // Increment views when portfolio loads
  useEffect(() => {
    if (data?.data) {
      portfolioService.incrementViews(slug);
    }
  }, [data, slug]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-8">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
          <a href="/" className="btn-primary">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <Portfolio portfolio={data?.data} isPreview={false} />;
};

export default PortfolioView;