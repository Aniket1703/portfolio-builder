import { Heart } from 'lucide-react';

const PortfolioFooter = ({ portfolio }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-2">
            © {new Date().getFullYear()} {portfolio?.personalInfo?.name}. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> using
            PortfolioBuilder
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;