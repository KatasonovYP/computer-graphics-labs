import { type FC } from 'react';
import compose from 'compose-function';

import { withChakra } from './with-chakra';
import { withRouter } from './with-router';
import { withStrict } from './with-strict';

export const withProviders = compose<FC>(withStrict, withRouter, withChakra);
