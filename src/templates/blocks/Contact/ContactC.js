import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../context/AppContext';
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
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <div className="text-xs grid gap-2">
        <AddressA data={data} />

      <ContactItem
        label={_.get(data,'profile.phone.heading', t("Phone"))}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")}
        link={`tel:${_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'telephone', "")}`}
      />
      <ContactItem
        label={_.get(data,'profile.website.heading', t("Website"))}
        value={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")}
        link={_.get(data,'jsonld["@graph"][1].sameAs[0]',"")}
      />
      <ContactItem
        label={_.get(data,'profile.email.heading' ,t("Email"))}
        value={_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")}
        link={`mailto:${_.get(_.find(data.jsonld["@graph"][1].contactPoint,{contactType:"Preferred"}), 'email', "")}`}
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
