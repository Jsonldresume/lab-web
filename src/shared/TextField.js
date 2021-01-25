import React from 'react';
import * as _  from 'lodash';

const availableLanguages = ['en', 'fr', 'it', 'de', 'ar'];

const MakeSelectOptions = function() {
  let options = [];
  availableLanguages.forEach((c) => {
    options.push(<option key={c} value={c}>{c}</option>);
  });
  return options;
};

export default class TextField extends React.Component {
    state = {
      editingLanguage: 'en'
	}

    handleMultiTextChange = (value, index) => {
      let allValues = this.props.value;
      if(!this.props.value || !Array.isArray(this.props.value)){
          allValues = [];
      }
      
      while(_.size(allValues)<=index){
        allValues.push("");
      }
      allValues[index] = value;
      
      this.props.onChange(allValues);
    }
    
    initAllValues = (lang) => {
      let allValues = this.props.value;
      if(!this.props.value || !Array.isArray(this.props.value)){
        allValues = [
          {
            "@language": lang,
            "@value": ""
          }
        ];
      }
      
      let currrentValueIndex = allValues.findIndex(x => x["@language"] === lang);
      if(currrentValueIndex < 0){
        let newLang = {
          "@language": lang,
          "@value": ""
        };
        allValues.push(newLang);
        this.props.onChange(allValues);
      }
      currrentValueIndex = allValues.findIndex(x => x["@language"] === lang);
      return currrentValueIndex;
    }
    handleLanguageChange = (lang) => {
      this.initAllValues(lang);
      
      this.setState({
        editingLanguage: lang
      });
    }
    handleTextChange = (lang, value) => {
      let currrentValueIndex = this.initAllValues(lang);
      let allValues = this.props.value;
      
      allValues[currrentValueIndex]["@value"] = value;
      this.props.onChange(allValues);
    }
    
    MultiItem = (x, index) => (
      <div key={"holder_"+index} style={{display: "flex"}}>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={this.props.type}
          disabled={this.props.disabled}
          value={this.props.value[index]}
          onChange={e => this.handleMultiTextChange(e.target.value, index)}
          placeholder={this.props.placeholder}
          key={"input_"+index}
        />
        {(_.size(this.props.value)<=1) ? ("") : (
        <button
          type="button"
          onClick={()=>{_.pullAt(this.props.value, index);this.props.onChange(this.props.value);}}
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
          key={"button_"+index}
        >
          <div className="flex items-center" key={"removeHolder_"+index}>
            <i className="material-icons font-bold text-base" key={"remove_"+index}>remove</i>
          </div>
        </button>)
        }
      </div>
    );
    render() {
      return (
		<div className={`w-full flex flex-col ${this.props.className}`}>
          {this.props.label && (
            <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
              {this.props.label}
            </label>
          )}
          { (this.props.type==="multilang") ? (
            <div style={{display: "flex"}}>
              <select value={this.state.editingLanguage} onChange={(event) => this.handleLanguageChange(event.target.value)}>
                  {MakeSelectOptions()}
              </select>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={this.props.type}
                disabled={this.props.disabled}
                value={this.props.value[((this.props.value.findIndex(x => x["@language"] === this.state.editingLanguage)>=0)?(this.props.value.findIndex(x => x["@language"] === this.state.editingLanguage)) : 0)]["@value"]}
                onChange={e => this.handleTextChange(this.state.editingLanguage, e.target.value)}
                placeholder={this.props.placeholder}
              />
            </div>
          ) : ( 
            (this.props.type==="multitext") ? (
              <div>
                {this.props.value.map(this.MultiItem)}
                <div key="holder_main" style={{display: "flex"}}>
                  <button
                    type="button"
                    onClick={()=>{this.props.value.push("");this.props.onChange(this.props.value);}}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
                    key="button_main"
                  >
                    <div className="flex items-center" key="addHolder_main">
                      <i className="material-icons font-bold text-base" key="add_main">add</i>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={this.props.type}
                disabled={this.props.disabled}
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
                placeholder={this.props.placeholder}
              />
            )
          )
          }
        </div>
      );
	}
};
