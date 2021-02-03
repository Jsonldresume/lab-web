import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../context/PageContext';
import { formatDate, safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const AwardItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold text-sm">{_.get(item, "['skill:title']", "")}</h6>
        <span className="text-xs">{_.get(item, "['skill:conferredBy'].name", "")}</span>
      </div>
      {_.get(item, "['skill:awardedDate']", "") !== '' && (
        <h6 className="text-xs font-medium text-right">
          {formatDate({ date: _.get(item, "['skill:awardedDate']", ""), language })}
        </h6>
      )}
    </div>
    {_.get(item, "description", "") !== '' && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={_.get(item, "description", "")} />
    )}
  </div>
);

const AwardsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (data.awards &&
    data.awards.enable) ? (
    <div>
      <Heading>{data.awards.heading}</Heading>
      <div className="grid gap-4">
        {_.get(data.jsonld["@graph"][0], 'award', []).filter(x => x["skill:title"]!=="").map((x) => (
          <AwardItem key={_.get(x,'@id', uuidv4())} item={x} language={data.language || 'en'} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(AwardsA);
