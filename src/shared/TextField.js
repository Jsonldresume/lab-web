import React from 'react';

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
    render() {
      return (
		<div className={`w-full flex flex-col ${this.props.className}`}>
          {this.props.label && (
            <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
              {this.props.label}
            </label>
          )}
          {(this.props.type==="multilang")?
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
          :
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={this.props.type}
              disabled={this.props.disabled}
              value={this.props.value}
              onChange={e => this.props.onChange(e.target.value)}
              placeholder={this.props.placeholder}
            />
          }
        </div>
      );
	}
};
