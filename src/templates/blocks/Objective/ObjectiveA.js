import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../context/PageContext';
import * as _  from 'lodash';

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    _.size(_.get(data, 'jsonld["@graph"][1].seeks',[]))>0 && (
      <div>
        <Heading>{data.objective.heading}</Heading>
        {_.get(data, 'jsonld["@graph"][1].seeks',[]).map((x, index) => (
              <ReactMarkdown key={"objetive_"+index} className="mr-10 text-sm" source={x.description} />
          ))}
      </div>
    )
  );
};

export default memo(ObjectiveA);
