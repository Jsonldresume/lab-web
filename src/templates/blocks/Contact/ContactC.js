import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PageContext from '../../../context/PageContext';
import { hasAddress, safetyCheck } from '../../../utils';
import BirthDateA from '../BirthDate/BirthDateA';
import AddressA from '../Address/AddressA';
import * as _  from 'lodash';

const ContactItem = ({ value, label, link }) =>
  value ? (
    <div className="flex flex-col">
      <h6 className="capitalize font-semibold">{label}</h6>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;
  
const ContactC = () => {
  const { t } = useTranslation();
  const { data } = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
        <AddressA data={data} />

      <ContactItem
        label={data.profile.phone.heading || "Phone"}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")}
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={data.profile.phone.heading || "Website"}
        value={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")}
        link={data.profile.website}
      />
      <ContactItem
        label={data.profile.phone.heading || "Email"}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")}
        link={`mailto:${data.profile.email}`}
      />

      <BirthDateA />

      {safetyCheck(data.social) &&
        data.social.items.map((x) => (
          <ContactItem
            key={x.id}
            value={x.username}
            label={x.network}
            link={x.url}
          />
        ))}
    </div>
  );
};

export default memo(ContactC);
