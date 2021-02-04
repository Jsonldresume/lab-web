import { get } from 'lodash';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretRight } from 'react-icons/fa';
import AppContext from '../../../context/AppContext';
import { safetyCheck } from '../../../utils';
import BirthDateC from '../BirthDate/BirthDateC';
import Icons from '../Icons';
import * as _  from 'lodash';

const ContactItem = ({ value, icon, link }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const Icon = get(Icons, icon && icon.toLowerCase(), FaCaretRight);

  return value ? (
    <div className="flex items-center">
      <Icon
        size="10px"
        className="mr-2"
        style={{ color: theme.colors.background }}
      />
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;
};

const ContactB = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <div className="text-xs grid gap-2">
      <ContactItem
        label={_.get(data,'profile.phone.heading', t("Phone"))}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")}
        icon="phone"
        link={`tel:${_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")}`}
      />
      <ContactItem
        label={_.get(data,'profile.website.heading', t("Website"))}
        value={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")}
        icon="website"
        link={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")}
      />
      <ContactItem
        label={_.get(data,'profile.email.heading' ,t("Email"))}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")}
        icon="email"
        link={`mailto:${_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")}`}
      />

      <BirthDateC />

      {safetyCheck(data.social) &&
        data.social.items.map((x) => (
          <ContactItem
            key={x.id}
            value={x.username}
            icon={x.network}
            link={x.url}
          />
        ))}
    </div>
  );
};

export default memo(ContactB);
