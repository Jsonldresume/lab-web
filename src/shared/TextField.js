import React, { useState } from 'react';

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
    handleLanguageChange = (lang) => {
        this.setState({
          editingLanguage: lang
        });
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
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
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
