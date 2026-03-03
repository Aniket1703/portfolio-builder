import api from './api';

export const portfolioService = {
  // Create portfolio
  createPortfolio: async (portfolioData) => {
    const response = await api.post('/portfolio', portfolioData);
    return response.data;
  },

  // Get my portfolio
  getMyPortfolio: async () => {
    const response = await api.get('/portfolio/my-portfolio');
    return response.data;
  },

  // Get portfolio by slug (public)
  getPortfolioBySlug: async (slug) => {
    const response = await api.get(`/portfolio/slug/${slug}`);
    return response.data;
  },

  // Update portfolio
  updatePortfolio: async (portfolioData) => {
    const response = await api.put('/portfolio', portfolioData);
    return response.data;
  },

  // Update specific section
  updateSection: async (sectionName, sectionData) => {
    const response = await api.patch(`/portfolio/section/${sectionName}`, sectionData);
    return response.data;
  },

  // Delete portfolio
  deletePortfolio: async () => {
    const response = await api.delete('/portfolio');
    return response.data;
  },

  // Check slug availability
  checkSlugAvailability: async (slug) => {
    const response = await api.get(`/portfolio/check-slug/${slug}`);
    return response.data;
  },

  // Publish/Unpublish portfolio
  publishPortfolio: async (isPublished) => {
    const response = await api.patch('/portfolio/publish', { isPublished });
    return response.data;
  },

  // Increment views
  incrementViews: async (slug) => {
    const response = await api.post(`/portfolio/slug/${slug}/view`);
    return response.data;
  },
};