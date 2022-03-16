import { useLocation } from 'react-router-dom';

export default function useQuery(): { [k: string]: string } {
  const location = useLocation();

  return Object.fromEntries(new URLSearchParams(location.search).entries());
}
