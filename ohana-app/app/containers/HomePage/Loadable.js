/**
 *
 * Asynchronously loads the component for HomePage
 *
 */

import Loadable from 'react-loadable';
import Loader from 'components/Loader';

export default Loadable({
  loader: () => import('./index'),
  loading: Loader,
});
