import compose from 'compose-function';
import { withRouter } from './with-router';
import { withChakra } from './with-chakra';

export const withProviders = compose(withRouter, withChakra);
