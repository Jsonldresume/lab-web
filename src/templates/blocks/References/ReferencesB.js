import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../context/PageContext';
import { safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const ReferenceItem = (x) => (
  <div key={_.get(x, '@id', uuidv4())} className="flex flex-col">
    <h6 className="font-semibold text-sm">{_.get(x, 'interactionType.participant.givenName', '')} {_.get(x, 'interactionType.participant.familyName', '')}</h6>
    <span className="text-xs">{_.get(x, 'interactionType.participant.jobTitle', '')}</span>
    <span className="text-xs">{_.get(x, 'interactionType.participant.telephone', '')}</span>
    <span className="text-xs">{_.get(x, 'interactionType.participant.email', '')}</span>
    {_.get(x, 'result[0].reviewRating.ratingExplanation', '')!=='' && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={_.get(x, 'result[0].reviewRating.ratingExplanation', '')} />
    )}
  </div>
);

const ReferencesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.references) ? (
    <div>
      <Heading>{data.references.heading}</Heading>
      <div className="grid gap-4">
        {_.get(data.jsonld["@graph"][1], 'interactionStatistic', []).filter(x => _.get(x, 'disambiguatingDescription', '')=== 'Reference').map(ReferenceItem)}
      </div>
    </div>
  ) : null;
};

export default memo(ReferencesB);
