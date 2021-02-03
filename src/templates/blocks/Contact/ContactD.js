import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdFlare } from 'react-icons/md';
import AppContext from '../../../context/AppContext';
import { hasAddress, safetyCheck } from '../../../utils';
import BirthDateA from '../BirthDate/BirthDateA';
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

const AddressItem = (x, index) => (
    (
      <div className="flex flex-col text-xs">
        <span>{x.streetAddress}</span>
        <span>{x.addressLocality} {x.addressRegion}</span>
        <span>{x.addressCountry} {x.postalCode}</span>
      </div>
    )
);

const Address = ({data}) => (
    (
      data.jsonld["@graph"][1].address && data.jsonld["@graph"][1].address.length>0 &&
      _.get(data, 'address.enable', true) && (
        <div>
          <h6 className="capitalize font-semibold">{data.profile.address.heading || "Address"}</h6>
          
          {data.jsonld["@graph"][1].address.filter(x => (Date.parse(x.hoursAvailable.validThrough) - Date.parse(new Date()))>0).map(AddressItem)}
        </div>
      )
    ) || ("")
);

const ContactD = () => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <div
      className="my-4 relative w-full border-2 grid gap-2 text-center text-xs py-5"
      style={{
        borderColor: theme.colors.primary,
      }}
    >
      <div
        className="absolute text-center"
        style={{
          top: '-11px',
          left: '50%',
          marginLeft: '-10px',
          color: theme.colors.primary,
        }}
      >
        <MdFlare size="20px" />
      </div>

        <Address data={data} />

      <ContactItem
        label={data.profile.phone.heading || "Phone"}
        value={data.profile.phone}
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={data.profile.phone.heading || "Website"}
        value={data.profile.website}
        link={data.profile.website}
      />
      <ContactItem
        label={data.profile.phone.heading || "Email"}
        value={data.profile.email}
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

export default memo(ContactD);
