import { useQuery, useMutation, useQueryClient } from 'react-query';
import { portfolioService } from '../services/portfolio.service';
import toast from 'react-hot-toast';

export const usePortfolio = () => {
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading, error } = useQuery(
    'myPortfolio',
    portfolioService.getMyPortfolio,
    {
      retry: false,
      onError: (error) => {
        if (error.response?.status !== 404) {
          toast.error('Failed to load portfolio');
        }
      },
    }
  );

  const createPortfolio = useMutation(portfolioService.createPortfolio, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPortfolio');
      toast.success('Portfolio created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create portfolio');
    },
  });

  const updatePortfolio = useMutation(portfolioService.updatePortfolio, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPortfolio');
      toast.success('Portfolio updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update portfolio');
    },
  });

  const updateSection = useMutation(
    ({ sectionName, sectionData }) =>
      portfolioService.updateSection(sectionName, sectionData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myPortfolio');
        toast.success('Section updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update section');
      },
    }
  );

  const publishPortfolio = useMutation(portfolioService.publishPortfolio, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('myPortfolio');
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to publish portfolio');
    },
  });

  return {
    portfolio: portfolio?.data,
    isLoading,
    error,
    createPortfolio,
    updatePortfolio,
    updateSection,
    publishPortfolio,
  };
};