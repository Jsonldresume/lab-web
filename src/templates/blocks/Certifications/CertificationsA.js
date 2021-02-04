import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../context/PageContext';
import { formatDate, safetyCheck } from '../../../utils';

import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const CertificationItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold text-sm">{_.get(item, 'educationalLevel', '')} {_.get(item, 'about.educationalCredentialAwarded', '')}</h6>
        <span className="text-xs">{_.get(item, "about.provider.name", "")}</span>
      </div>
      { _.get(item, "about.endDate", "") !== '' && (
        <h6 className="text-xs font-medium text-right">
          {formatDate({ date: _.get(item, "about.endDate", ""), language })}
        </h6>
      )}
    </div>
    {_.get(item, 'abstract', '') !== '' && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={_.get(item, 'abstract', '')} />
    )}
  </div>
);

const CertificationsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (data.certifications &&
    data.certifications.enable) ? (
    <div>
      <Heading>{data.certifications.heading}</Heading>
      <div className="grid gap-4">
        {_.get(data, "jsonld['@graph'][1].hasCredential", []).filter(x => (!_.get(x, '@id', '').endsWith("disable") && _.toLower(_.get(x, 'credentialCategory', ''))!=="degree")).map(x=> (<CertificationItem
            key={_.get(x,'@id', uuidv4())}
            item={x}
            language={data.language}
          />))}
      </div>
    </div>
  ) : null;
};

export default memo(CertificationsA);
