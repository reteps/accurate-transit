import { Routes as RouteWrapper, Route } from 'react-router-dom';

import Home from 'routes/Home';
import NotFound from 'routes/NotFound';
import Overview from 'routes/Overview';

export default function Routes() {
  return (
    <RouteWrapper>
      <Route path="/" element={<Home />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="*" element={<NotFound />} />
    </RouteWrapper>
  );
}
