import React from 'react';
import { useTranslation } from 'react-i18next';
import * as _  from 'lodash';

import TextField from '../../../shared/TextField';

const ProfileTab = ({ data, onChange }) => {
  const { t } = useTranslation('leftSidebar');
  let personUrl = "_:";
  const setValue = (path, field, v, type="", id="_:") => {
    let val = _.get(data, path+"."+field, null);
    if(val === null){
      if(typeof(v) === "string" || typeof(v) === "number"){
        _.set(data, path+"."+field, "");
      }else if(typeof(v) === "object"){
          if(Array.isArray(v)){
            _.set(data, path+"."+field, []);
          }else{
            _.set(data, path+"."+field, {});
          }
      }
    }
    onChange("data."+path+'.'+field, v);
    onChange("data."+path+'["@id"]', id);
    onChange("data."+path+'["@type"]', type);
  };
  return (
    <div>
      <TextField
        className="mb-6"
        placeholder="Heading"
        value={data.profile.heading}
        onChange={v => onChange('data.profile.heading', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.photoUrl.label')}
        placeholder="https://i.imgur.com/..."
        value={_.get(data, 'jsonld["@graph"][1].image.contentUrl', "")}
        onChange={v => {setValue('jsonld["@graph"][1].image', "contentUrl", v, "ImageObject", personUrl+"#image");}}
      />

      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('profile.firstName.label')}
          placeholder="Jane"
          value={data.jsonld['@graph'][1].givenName}
          onChange={v => onChange('data.jsonld["@graph"][1].givenName', v)}
          type="multilang"
        />

        <TextField
          className="mb-6"
          label={t('profile.lastName.label')}
          placeholder="Doe"
          value={data.jsonld['@graph'][1].familyName}
          onChange={v => onChange('data.jsonld["@graph"][1].familyName', v)}
          type="multilang"
        />
      </div>

      <TextField
        className="mb-6"
        label={t('profile.subtitle.label')}
        placeholder="Full-Stack Web Developer"
        value={data.profile.subtitle}
        onChange={v => onChange('data.profile.subtitle', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.address.line1.label')}
        placeholder="Palladium Complex"
        value={data.profile.address.line1}
        onChange={v => onChange('data.profile.address.line1', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.address.line2.label')}
        placeholder="140 E 14th St"
        value={data.profile.address.line2}
        onChange={v => onChange('data.profile.address.line2', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.address.line3.label')}
        placeholder="New York, NY 10003 USA"
        value={data.profile.address.line3}
        onChange={v => onChange('data.profile.address.line3', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.phone.label')}
        placeholder="+1 541 754 3010"
        value={data.profile.phone}
        onChange={v => onChange('data.profile.phone', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.website.label')}
        placeholder="janedoe.me"
        value={data.profile.website}
        onChange={v => onChange('data.profile.website', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.email.label')}
        placeholder="jane.doe@example.com"
        value={data.profile.email}
        onChange={v => onChange('data.profile.email', v)}
      />
    </div>
  );
};

export default ProfileTab;
