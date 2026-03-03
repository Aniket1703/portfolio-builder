import Portfolio from '../portfolio/Portfolio';

const LivePreview = ({ portfolio }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-3 z-10">
        <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
      </div>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Portfolio portfolio={portfolio} isPreview={true} />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;