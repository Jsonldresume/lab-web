import React from 'react';
import { useTranslation } from 'react-i18next';
import * as _  from 'lodash';

import TextField from '../../../shared/TextField';

const ProfileTab = ({ data, onChange }) => {
  const { t } = useTranslation('leftSidebar');
  let personUrl = "_:";
  const setValue = (path, field, v, type=null, id=null) => {
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
    if(id){
      onChange("data."+path+'["@id"]', id);
    }
    if(type){
      onChange("data."+path+'["@type"]', type);
    }
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
          value={_.get(data,"jsonld['@graph'][1].givenName", "")}
          onChange={v => setValue('jsonld["@graph"][1]', "givenName", v)}
          type="multilang"
        />

        <TextField
          className="mb-6"
          label={t('profile.lastName.label')}
          placeholder="Doe"
          value={_.get(data,"jsonld['@graph'][1].familyName", "")}
          onChange={v => setValue('jsonld["@graph"][1]', "familyName", v)}
          type="multilang"
        />
      </div>

      <TextField
        className="mb-6"
        label={t('profile.subtitle.label')}
        placeholder="Full-Stack Web Developer"
        value={_.get(data, 'jsonld["@graph"][1].description', "")}
        onChange={v => {setValue('jsonld["@graph"][1]', "description", v);}}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.website.label')}
        placeholder="janedoe.me"
        value={_.get(data,'jsonld["@graph"][1].sameAs', [])}
        onChange={v => setValue('jsonld["@graph"][1]', "sameAs", v)}
        AddItem={()=>{}}
        type="multitext"
      />

    </div>
  );
};

export default ProfileTab;
