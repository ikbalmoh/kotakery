import Products from './components/Products';
import Summaries from './components/Summaries';

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
