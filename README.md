<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/jsonldresume.png" width="256px" />

## A free and open source resume builder.

[![GitHub](https://img.shields.io/github/license/jsonldresume/lab-web)](https://github.com/jsonldresume/lab-web/blob/main/LICENSE)

### [Go to App](https://jsonldresume.github.io/lab-web/)

To test the application, click the link above, and from the dropdown menu in right panel, select "Actions", and then scroll down and click on "Load Data" button to load demo data.

### What is this app all about?

Jsonld Resume is a free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this app, you can create resumes that are read-able and index-able by all machine learning algorithms and systems easily and accurately, print as PDF (single-page or multi-page), all for free, no advertisements, without losing the integrity and privacy of your data.

You have complete control over what goes into your resume, how it looks, what colors, what templates, even the layout in which sections placed. Want a dark mode resume? It’s as easy as editing 3 values and you’re done. You don’t need to wait to see your changes either. Everything you type, everything you change, appears immediately on your resume and gets updated in real time.

### Features

- Create a readable resume for all machine learning algorithms
- Choose from 6 vibrant templates and more coming soon
- Structure sections and change layouts the way you want to
- Rename sections according to your language/industry
- Mix and match colors to any degree, even a dark mode resume?
- Pick from a variety of crisp and clear fonts
- Easy to translate to your own language
- Import your existing [Json-ld Resume](https://jsonldresume.org/) in one click
- No advertisements, no data sharing, no marketing emails
- **Everything is free, and there’s no catch!**

### Screenshots

<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/screenshots/1.JPG" width="400px" />
&nbsp;
<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/screenshots/2.JPG" width="400px" />
&nbsp;
<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/screenshots/3.JPG" width="400px" />

### Translation

To translate the app, just fork the repository, go to `src/i18n/locales` and duplicate the `en.json` file to a new file `your-lang-code.json` and translate all of the strings inside. It's a simple process that would take just a few minutes, and by contributing, your name could also be added down below as a contributor.

##### Languages Currently Supported

- Arabic (عربى)
- Czech (čeština)
- Chinese Simplified (简体中文)
- Danish (Dansk)
- Dutch (Nederlands)
- English (US)
- Finnish (Suomalainen)
- French (Français)
- German (Deutsche)
- Hindi (हिंदी)
- Italian (Italiano)
- Japanese (日本人)
- Kannada (ಕನ್ನಡ)
- Norwegian (Norsk)
- Persian (Farsi)
- Polish (Polskie)
- Portuguese (Brazilian)
- Portuguese (Portugal)
- Russian (русский)
- Spanish (Español)
- Swedish (Svenska)
- Turkish (Türkçe)
- Ukrainian (Українська)

Thank you to all the amazing people who have contributed by translating it into their native language.

### Installing Pre-requisites

- NodeJS/NPM

This application needs NodeJs to run. You can download and install NodeJs from the below link on any platform if you do not have it already.
[Download NodeJS](https://nodejs.org/en/)

you can also check if you already have NodeJs installed by running the following two commands in terminal window

```
node -v
npm -v
```

- Git
You can use git to be able to easily download the files from github into our computer (unless in step 1, you prefer to download files manually from this github repository)
[Download Git-Scm](https://git-scm.com/downloads)

you can also check whether you already have NodeJs installed by running the following command in terminal window

```
git --version
```

### Building from Source

Want to run your own instance of Json-ld lab-web? You are very much free to do so. Follow 3 easy steps. Open cmd (command prompt/terminal) and follow the steps below:

1. First, clone this project repository and go to the cloned folder, by running the below two commands.

```
git clone https://github.com/jsonldresume/lab-web.git
cd lab-web
```

2. Run npm install to install dependencies for the project, like below.

```
npm install
```

3. Run `npm run start` to run the development server or `npm run build` to build the production app.

```
npm run start
```

And that's it! 🎉

### Contribute

I try to do what I can, but if you found the app helpful, please consider contributing to it. Here is a list of TODOs:

1. Remove all json syntaxes and make the data structure totally json-ld. Currently resume data are on json-ld, but theme data are in json.

2. Build more fields to lverage the full power of json-ld. Right now, only a handful of fields are added to the resume, but we can have much more, like the sample json-ld resume you can find under skill repository.

3. Remove warnings. There are a few warnings by node.

4. There are some erros due to missing fields by google structral data testing tool. Those fields need to be added.

### Appreciation

Thank you to everyone who made this project possible, including the many users who voiced their opinionsduring Json-ld resume project, and helped us along the way to make this a reality.

<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/Mitacs.png" width="60px" /> [Mitacs](https://www.mitacs.ca/) for funding the project

<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/DXC.jpg" width="60px" /> [Direction X Corporation](https://directionx.ca) for co-funding and managing the project

<img src="https://raw.githubusercontent.com/Jsonldresume/lab-web/main/public/images/shiri.jpg" width="60px" /> [Dr. Nematollah Shiri](https://www.concordia.ca/ginacody/computer-science-software-eng/faculty.html?fpid=nematollaah-shiri) for contributing to the research of the project

<img src="https://crowdin-static.downloads.crowdin.com/avatar/14158753/large/e36727872f9ce95f97b0a7e49cb28667.jpeg" width="60px" /> [Amruth Pillai](https://github.com/AmruthPillai) for [Reactive-Resume Project](https://github.com/AmruthPillai/Reactive-Resume), which lab-web is heavily based on. We modified the base code to accomodate for json-ld instead of original json format, and also added cool fatures that are only attainable with json-ld.

---

![The Great Gatsby](https://camo.githubusercontent.com/a615c7e1ef9a850f5427cdc153186763305bb853/68747470733a2f2f692e696d6775722e636f6d2f4472386a3569762e676966)

###### Made with Love by [Jsonldresume](https://jsonldresume.org/)
