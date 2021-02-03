import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PageContext from '../../../context/PageContext';
import AppContext from '../../../context/AppContext';
import { formatDate } from '../../../utils';
import * as _  from 'lodash';

const BirthDateA = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  if (_.get(data,"jsonld['@graph'][1].birthDate","")) {
    return (
      <div className="text-xs">
        <h6 className="capitalize font-semibold">
          {data.profile.birthDate.heading || "Birth Date"}
        </h6>
        <div>
          <span>
            {formatDate({
              date: _.get(data,"jsonld['@graph'][1].birthDate",""),
              language: data.language || 'en',
              includeDay: true,
            })}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateA);
