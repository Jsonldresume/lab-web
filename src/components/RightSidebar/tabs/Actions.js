/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import PageContext from '../../../context/PageContext';
import { importJson } from '../../../utils';

import * as _  from 'lodash';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ActionsTab = ({ data, theme, dispatch }) => {
  const pageContext = useContext(PageContext);
  const { setPrintDialogOpen } = pageContext;
  const { t } = useTranslation('rightSidebar');
  const fileInputRef = useRef(null);
  
  const exportToJsonld = () => {
    const backupObj = { data, theme };
    let dataclone = _.cloneDeep(data.jsonld);
    let javascript_part1 = '<script type="application/ld+json">'+JSON.stringify(dataclone)+"</script>";
    _.set(dataclone['@graph'][1], "@context", "http://schema.org/");
    let javascript_part2 = '<script type="application/ld+json">'+JSON.stringify(dataclone['@graph'][1])+"</script>";
    
    let javascript = javascript_part1 + javascript_part2;
    var zip = new JSZip();
    zip.file("script.js", javascript);
    zip.file("resume.json", JSON.stringify(backupObj));
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "jsonldresume.zip");
    });
  };

  const loadDemoData = () => {
    dispatch({ type: 'load_demo_data' });
    dispatch({ type: 'save_data' });
  };

  const resetEverything = () => {
    dispatch({ type: 'reset' });
    dispatch({ type: 'save_data' });
  };

  return (
    <div>
      <div className="shadow text-center text-sm p-5">{t('actions.disclaimer')}</div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.importExport.heading')}</h6>

        <p className="text-sm">{t('actions.importExport.body')}</p>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => importJson(e, dispatch)}
        />
        <a id="downloadAnchor" className="hidden" />

        <div className="mt-4 grid grid-cols-2 col-gap-6">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">publish</i>
              <span className="text-sm">{t('actions.importExport.buttons.import')}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={exportToJsonld}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">get_app</i>
              <span className="text-sm">{t('actions.importExport.buttons.export')}</span>
            </div>
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.downloadResume.heading')}</h6>
        <div className="text-sm">{t('actions.downloadResume.body')}</div>

        <button
          type="button"
          onClick={() => setPrintDialogOpen(true)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">save</i>
            <span className="text-sm">{t('actions.downloadResume.buttons.saveAsPdf')}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.loadDemoData.heading')}</h6>

        <div className="text-sm">{t('actions.loadDemoData.body')}</div>

        <button
          type="button"
          onClick={loadDemoData}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">flight_takeoff</i>
            <span className="text-sm">{t('actions.loadDemoData.buttons.loadData')}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.reset.heading')}</h6>

        <div className="text-sm">{t('actions.reset.body')}</div>

        <button
          type="button"
          onClick={resetEverything}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">refresh</i>
            <span className="text-sm">{t('actions.reset.buttons.reset')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionsTab;
