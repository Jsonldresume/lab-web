import React, { memo, useContext } from 'react';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';
  
const NamesA = ({data, className="tracking-wide uppercase font-bold"}, style={ fontSize: '2.75em' }) => (
    <h1 className={className} style={style}>
          {(Array.isArray(data.jsonld['@graph'][1].givenName)) ? (_.get(data,"jsonld['@graph'][1].givenName[0]['@value']","")) : (data.jsonld['@graph'][1].givenName)} {(Array.isArray(data.jsonld['@graph'][1].familyName)) ? (_.get(data,"jsonld['@graph'][1].familyName[0]['@value']", "")) : (data.jsonld['@graph'][1].familyName)}
        </h1>
  );

export default memo(NamesA);
