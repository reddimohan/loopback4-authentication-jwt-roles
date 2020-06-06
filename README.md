


[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
# loopback4-authentication-jwt-roles


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/reddimohan/loopback4-authentication-jwt-roles">
  </a>

  <h3 align="center">Loopback 4 JWT Authentication with Roles</h3>

  <p align="center">
    Loopback 4 Boilerplate code for quick implimentation of Authentication and Roles based on JWT.
    <br />
    <br />
    <a href="https://github.com/reddimohan/loopback4-authentication-jwt-roles">View Demo</a>
    ·
    <a href="https://github.com/reddimohan/loopback4-authentication-jwt-roles/issues">Report Bug</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![https://reddimohan.github.io][product-screenshot-1]](API home screen)
### API Docs
[![https://reddimohan.github.io][product-screenshot-2]](API docs link)

### Built With

* [Loopback 4](https://loopback.io/doc/en/lb4)
* [MySQL](https://www.mysql.com)
* [jwt](https://jwt.io)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* node.js, npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/reddimohan/loopback4-authentication-jwt-roles.git
```
2. Install NPM packages
```sh
npm install
```
3. Create a database (MySQL)
4. Update database details in src/datasources/mysql.datasource.config.json file
```sh
{
  "name": "mysql",
  "connector": "mysql",
  "url": "",
  "host": "localhost",
  "port": 3306,
  "user": "<username>",
  "password": "<password>",
  "database": "<db_name>"
}
```
5. Migrade database schema
```sh
npm run build
num run migrate
```
6. Start the application
```sh
npm start
```
7. Install Loopback 4 CLI - This will be useful when you want to start developing on top this repo
```sh
npm install -g @loopback/cli
```


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/reddimohan/loopback4-authentication-jwt-roles/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Mohan - [LinkedIn](https://linkedin.com/in/reddimohan) - [Twitter](https://twitter.com/reddimohan)

Project Link: [https://github.com/reddimohan/loopback4-authentication-jwt-roles](https://github.com/reddimohan/loopback4-authentication-jwt-roles)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/reddimohan/loopback4-authentication-jwt-roles.svg?style=flat-square
[contributors-url]: https://github.com/reddimohan/loopback4-authentication-jwt-roles/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/reddimohan/loopback4-authentication-jwt-roles.svg?style=flat-square
[forks-url]: https://github.com/reddimohan/loopback4-authentication-jwt-roles/network/members
[stars-shield]: https://img.shields.io/github/stars/reddimohan/loopback4-authentication-jwt-roles.svg?style=flat-square
[stars-url]: https://github.com/reddimohan/loopback4-authentication-jwt-roles/stargazers
[issues-shield]: https://img.shields.io/github/issues/reddimohan/loopback4-authentication-jwt-roles.svg?style=flat-square
[issues-url]: https://github.com/reddimohan/loopback4-authentication-jwt-roles/issues
[license-shield]: https://img.shields.io/github/license/reddimohan/loopback4-authentication-jwt-roles.svg?style=flat-square
[license-url]: https://github.com/reddimohan/loopback4-authentication-jwt-roles/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/reddimohan
[product-screenshot-1]: images/home.png
[product-screenshot-2]: images/api_docs.png
