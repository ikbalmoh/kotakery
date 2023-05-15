import Products from './components/sections/Products';
import Summaries from './components/sections/Summaries';

export const metadata = {
  title: 'Dashboard | Kotakery Merchant',
  description: 'Dashboard Kotakery Merchant',
};

export default function Dashboard() {
  return (
    <div>
      <Summaries />
      <div className="mt-10"></div>
      <Products />
    </div>
  );
}
