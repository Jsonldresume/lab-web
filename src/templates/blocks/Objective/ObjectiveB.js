import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import AppContext from '../../../context/AppContext';
import * as _  from 'lodash';

const ObjectiveB = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  return (
    _.size(_.get(data, 'jsonld["@graph"][1].seeks',[]))>0 && (
      <div>
        <hr
          className="my-5 opacity-25"
          style={{ borderColor: theme.colors.background }}
        />
        {_.get(data, 'jsonld["@graph"][1].seeks',[]).map((x, index) => (
              <ReactMarkdown key={"objetive_"+index} className="text-sm" source={x.description} />
          ))}
      </div>
    )
  );
};

export default memo(ObjectiveB);
