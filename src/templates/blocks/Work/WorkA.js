import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../context/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';
import SectionSkillsA from '../SectionSkills/SectionSkillsA';
import * as _  from 'lodash';
import { v4 as uuidv4 } from 'uuid';

  
const WorkResponsibilityItem = x => (
    x && (
        <li className="mt-2 text-sm" key={uuidv4()}>{x}</li>
    )
)
    
const WorkResponsibility = ({responsibilities}) => (
    responsibilities && (responsibilities.length>0) && (
      <ul>
      {
        responsibilities.filter(x => (x !== '')).map(WorkResponsibilityItem)
      }
      </ul>
    )
)

const WorkItem = ({ item, language='en' }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{_.get(item,'subjectOf.organizer.name','')}</h6>
          <span className="text-xs">{_.get(item,'roleName', '')}</span>
        </div>
        { _.get(item,'startDate','') !== '' && (
          <h6 className="text-xs font-medium text-right">
            (
            {formatDateRange(
              {
                startDate: _.get(item,'startDate',''),
                endDate: _.get(item,'endDate',''),
                language,
              },
              t,
            )}
            )
          </h6>
        )}
      </div>
      {_.get(item,'description','') !== '' && (
        <ReactMarkdown
          className="markdown mt-2 text-sm"
          source={_.get(item,'description','')}
        />
      )}
      <WorkResponsibility responsibilities={_.get(item, "hasOccupation.responsibilities", [])} />
      <SectionSkillsA skills={_.get(item, "hasOccupation.skills", [])} />
    </div>
  );
};

const WorkA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (_.get(data, "jsonld['@graph'][1].hasOccupation", []).length > 0 && data.work.enable) ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div className="grid gap-4">
        {_.get(data, "jsonld['@graph'][1].hasOccupation", []).filter(x => !_.get(x, '@id', '').endsWith("disable")).map((x) => (
          <WorkItem key={_.get(x,'@id', uuidv4())} item={x} language={data.language || 'en'} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(WorkA);
