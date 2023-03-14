import { type FC } from 'react';
import compose from 'compose-function';

import { withChakra } from './with-chakra';
import { withRouter } from './with-router';

export const withProviders = compose<FC>(withRouter, withChakra);
