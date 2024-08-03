# Supabase Edge Functions

## Table of Contents

- [Introduction](#introduction)
- [Homebrew Installation](#homebrew-installation)
- [Supabase CLI](#supabase-cli)
- [Deploy Edge Functions](#deploy-edge-functions)

## Introduction

This guide provides step-by-step instructions to set up your environment, install necessary tools, and deploy Supabase Edge Functions.

## Homebrew Installation

### Update System Packages

First, update your system packages to ensure you have the latest versions:

```sh
sudo apt update
sudo apt upgrade -y
```

### Install Required Dependencies

Homebrew requires some dependencies that may not be installed by default. Install them with the following command:

```sh
sudo apt install build-essential curl file git -y
```

### Download and Install Homebrew

Use the following command to download and install Homebrew. During the installation process, you may be prompted to confirm the installation and enter your password.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Add Homebrew to Your PATH

To ensure Homebrew is available in your terminal sessions, you need to add it to your PATH. Open (or create) the `~/.profile `file and add the following lines:

```sh
# Add Homebrew to PATH
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

You can use `nano`, `vim`, or any other text editor to edit the file. Here’s an example using `nano`:

```sh
nano ~/.profile
```

### Add Homebrew to .bashrc (Optional)

Add the same line as above in the `~/basrc` file:

```sh
nano ~/.bashrc
```

### Reload Your Profile

To apply the changes without logging out and back in, reload your profile with the following commands:

```sh
source ~/.profile
source ~/.bashrc
```

## Supabase CLI

### Install Clang (Optional)

While Clang should be available with Homebrew installation, you can install it using apt-get if needed:

```sh
sudo apt-get install clang
```

### Installation

Install the Supabase CLI using Homebrew:

```sh
brew install supabase/tap/supabase
```

## Deploy Edge Functions

### Login

First, login to Supabase through the terminal:

```sh
supabase login
```

Follow the link provided in the terminal if your browser does not open automatically.

### Install Docker

The installation steps for Docker depend on your device. Please refer to the Docker installation guide for detailed instructions.

### Create and Deploy

To create a new function, run the following command:

```sh
supabase functions new your-name
```

To deploy or update the function, run this command:

```sh
supabase functions deploy your-name --project-ref refkey

```

This completes the setup and deployment process for Supabase Edge Functions.
