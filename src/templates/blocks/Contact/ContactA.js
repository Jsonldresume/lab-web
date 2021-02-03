import { get } from 'lodash';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretRight } from 'react-icons/fa';
import AppContext from '../../../context/AppContext';
import { safetyCheck } from '../../../utils';
import BirthDateB from '../BirthDate/BirthDateB';
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
        style={{ color: theme.colors.primary }}
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

const ContactA = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <div className="text-xs grid gap-2">
      <ContactItem
        label={data.profile.phone.heading || "Phone"}
        value={data.profile.phone}
        icon="phone"
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={data.profile.phone.heading || "Website"}
        value={data.profile.website}
        icon="website"
        link={data.profile.website}
      />
      <ContactItem
        label={data.profile.phone.heading || "Email"}
        value={data.profile.email}
        icon="email"
        link={`mailto:${data.profile.email}`}
      />

      <BirthDateB />

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

export default memo(ContactA);
