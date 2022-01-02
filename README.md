# My Portfolio 

This is the source code for my portfolio website, currently in progress. 

## Installation

I don't know why you'd want to install this, but for posterity:

```bash
npm install
```

Be sure to set the following environment variables:

```bash
//Dev disables HTTPS and HTTP > HTTPS redirect. Prod is Default
NODE_ENV={production|development}
```

## Usage

To create a service with systemd, create **NAME.service** in **"/etc/systemd/system/"**. The file should contain:

```ini
[Unit]
Description={DESCRIPTION}
After=network.target

[Service]
Type=simple
User={USERNAME}
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```
**Values inside curly brackets are variable, defined below:**

**DESCRIPTION** = arbitrary description text

**USERNAME** = a user on the system that can bind port 80 and 443 (443 in production only.)

## Contributing
If you're interested in contributing to my personal portfolio, first of all, hi mom! Second of all, please open an issue first to discuss what you would like to change so that you don't waste your time on something that I reject out of hand.

## License
[GPL2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) - Karim