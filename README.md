# mediasoup-website

[mediasoup](https://mediasoup.org) website.

## Installation requirements

Ruby 3.4.6 is required.

```zsh
brew install rbenv ruby-build
```

In `.zshrc` (or Bash config file) add:

```zsh
#
# Ruby rbenv.
#
export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
eval "$(rbenv init - zsh)"
```

Then reload your Zsh or Bash configuration:

```zsh
source ~/.zshrc
```

Install Ruby 3.4.6:

```zsh
rbenv install 3.4.6
```

Use Ruby 3.4.6 in `mediasoup-website` project:

```zsh
rbenv local 3.4.6
rbenv rehash
```

Now Ruby version in `mediasoup-website` project should be 3.4.6:

```zsh
ruby -v
which ruby
```

Install Ruby `bundler` and project gems:

```zsh
gem install bundler
bundle install
```

Note that project gems are installed in `vendor/bundle` due to the configuration in `.bundle/config`.


### SCSS files

Former `_compass` is now renamed to `_scss`. It contains `.scss` files that should be processed with `jekyll-compass`, however `jekyll-compass` is not maintained and it's not compatible with Jekyll 4.

As a workaround, `_scss` files have been compiled into a single `css/mediasoup.css` file using this command in a separate temporal project that uses Ruby 2.7.8 with `compass` and `breakpoint` gems in `Gemfile`:

```zsh
bundle exec compass compile --sass-dir /Users/xxx/src/mediasoup-website/_scss --css-dir /Users/xxx/src/mediasoup-website/css -r breakpoint
```

This is obviously a workaround and we need a better solution.


## Development

See commands in `gulpfile.mjs` file.
