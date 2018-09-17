/**
 *
 * Asynchronously loads the component for TimelinePage
 *
 */

import Loadable from 'react-loadable';
import Loader from 'components/Loader';

export default Loadable({
  loader: () => import('./index'),
  loading: Loader,
});
