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


## Development

See commands in `gulpfile.mjs` file.
