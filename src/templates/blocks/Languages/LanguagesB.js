import React, { memo, useContext } from 'react';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const LanguageItem = (x) => (
  <div key={_.get(x,'@id', uuidv4())} className="flex flex-col">
    <h6 className="font-semibold text-sm">{_.get(x, 'name', '')}</h6>
    <span className="text-xs">{x.fluency}</span>
  </div>
);

const LanguagesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (data.languages &&
    data.languages.enable && (_.get(data, 'jsonld["@graph"][1].knowsLanguage',[]).length > 0)) ? (
    <div>
      <Heading>{data.languages.heading}</Heading>
      <div className="grid gap-2">{_.get(data, 'jsonld["@graph"][1].knowsLanguage', []).filter(x => _.get(x, 'name', '') !== '').map(LanguageItem)}</div>
    </div>
  ) : null;
};

export default memo(LanguagesB);
