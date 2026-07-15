+++
title = "FTP Server"

[extra]
toc = true
+++

WIDE Tsukuba NOC provides a public FTP mirror service.

<img src="/images/ftp-mirror-about.png" alt="Overview of the FTP mirror server" width="65%" />

Domain: [`ftp.tsukuba.wide.ad.jp`](https://ftp.tsukuba.wide.ad.jp/)

## Usage

### Downloading OS images

The download locations for each OS image are listed below.

- AOSC OS (Anthon OS)
  - [Downloads](https://ftp.tsukuba.wide.ad.jp/anthon/)
- Arch Linux
  - [Latest release](https://ftp.tsukuba.wide.ad.jp/archlinux/iso/latest/)
- Debian
  - [Latest release](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/)
  - [Latest release (x86_64)](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/amd64/iso-cd/)
  - [Latest release (arm64)](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/arm64/iso-cd/)
- Deepin
  - [Downloads](https://ftp.tsukuba.wide.ad.jp/deepin-cd/)
- Mageia
  - [Downloads](https://ftp.tsukuba.wide.ad.jp/mageia/iso/)
- MX Linux / antiX
  - [Downloads](https://ftp.tsukuba.wide.ad.jp/mxlinux-iso/)
- Ubuntu
  - [Downloads](https://ftp.tsukuba.wide.ad.jp/ubuntu-releases/)

### Using the server as a package repository

The following instructions cover the main package repositories currently available on this server.

> **Disclaimer:** The following commands are configuration examples and have not all been verified. WIDE Tsukuba NOC accepts no liability for any damage arising from the use of these instructions.

#### AOSC OS (Anthon OS)

Select the Tsukuba mirror with `oma`. Repository metadata is refreshed automatically after the change.

```console
sudo oma mirror set tsukuba
```

If an older version of `oma` does not support `set`, run `sudo oma mirror` and select `tsukuba` from the list.

- References
  - [aosc-os-repository-data/mirrors.toml at master · AOSC-Dev/aosc-os-repository-data · GitHub](https://github.com/AOSC-Dev/aosc-os-repository-data/blob/master/mirrors.toml#LC100)

#### Arch Linux

Set the URL registered by the Tsukuba mirror with Arch Linux directly in `/etc/pacman.d/mirrorlist`.

```console
echo 'Server = http://ftp.tsukuba.wide.ad.jp/Linux/archlinux/$repo/os/$arch' | sudo tee /etc/pacman.d/mirrorlist
sudo pacman -Syu
```

- References
  - [Arch Linux - ftp.tsukuba.wide.ad.jp - Mirror Details](https://archlinux.org/mirrors/ftp.tsukuba.wide.ad.jp/)

#### CentOS Stream

CentOS Stream 9 and 10 use `metalink` in their default configuration. Set the `baseurl` for BaseOS, AppStream, CRB, and extras-common with `dnf config-manager`.

```console
sudo dnf install dnf-plugins-core
for r in BaseOS AppStream CRB; do
  sudo dnf config-manager --save \
    --setopt="${r,,}.metalink=" \
    --setopt="${r,,}.baseurl=https://ftp.tsukuba.wide.ad.jp/centos-stream/\$stream/$r/\$basearch/os/"
done
sudo dnf config-manager --save \
  --setopt=extras-common.metalink= \
  --setopt='extras-common.baseurl=https://ftp.tsukuba.wide.ad.jp/centos-stream/SIGs/$stream/extras/$basearch/extras-common/'
sudo dnf clean all && sudo dnf makecache
```

#### Debian

On Debian 13 and later, edit `/etc/apt/sources.list.d/debian.sources` in a typical installation. Do not change `security.debian.org`, because this service does not mirror the Debian security repository.

```console
sudo sed -Ei 's|https?://deb\.debian\.org/debian|https://ftp.tsukuba.wide.ad.jp/debian|g' /etc/apt/sources.list.d/debian.sources
sudo apt update
```

On Debian 12 and earlier using the traditional format, use the following commands.

```console
sudo sed -Ei 's|https?://deb\.debian\.org/debian|https://ftp.tsukuba.wide.ad.jp/debian|g' /etc/apt/sources.list
sudo apt update
```

- References
  - [Chapter 9. Keeping your Debian system up-to-date](https://www.debian.org/doc/manuals/debian-faq/uptodate.en.html#aptitude-upgrade)

#### Deepin

In Control Center, open Update Settings under Update, turn off `Smart Mirror Switch`, and select `[JP] Tsukuba WIDE Public Mirror` under `Default Mirror Source`.

On a Deepin 20, 23, or 25 system without a GUI, use the following commands.

```console
sudo sed -Ei 's|https?://community-packages\.deepin\.com/(deepin/)?|https://ftp.tsukuba.wide.ad.jp/Linux/deepin/|g' /etc/apt/sources.list
sudo apt update
```

- References
  - [Packages – Deepin Technology Community](https://www.deepin.org/en/mirrors/packages/)

#### Mageia

Remove the currently configured media and add the Tsukuba mirror for the installed release and architecture. This also removes any custom media; add them again afterwards if required.

```console
sudo urpmi.removemedia -a
sudo urpmi.addmedia --distrib 'https://ftp.tsukuba.wide.ad.jp/mageia/distrib/$RELEASE/$ARCH'
```

- References
  - [URPMI - Mageia wiki](https://wiki.mageia.org/en/URPMI#Manually_choosing_a_mirror)

#### Manjaro Linux

Select the Tsukuba mirror with `pacman-mirrors`, then update the system. The currently selected stable, testing, or unstable branch is retained.

```console
sudo pacman-mirrors --api --url https://ftp.tsukuba.wide.ad.jp/Linux/manjaro/ && sudo pacman -Syu
```

- References
  - [Pacman-mirrors - Manjaro](https://wiki.manjaro.org/index.php?title=Pacman-mirrors#Available_arguments)

#### MX Linux / antiX

On MX Linux, run `mx-repo-manager`, select `Japan, Tsukuba` under `MX repos`, and click `Apply`.

```console
mx-repo-manager
sudo apt update
```

On MX Linux 25 or later without a GUI, use the following commands.

```console
sudo sed -Ei 's#(https?|ftp)://[^[:space:]]+/mx/repo/?#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/mx/repo/#g' /etc/apt/sources.list.d/mx.sources
sudo apt update
```

On MX Linux 23 or earlier without a GUI, use the following commands.

```console
sudo sed -Ei 's#(https?|ftp)://[^[:space:]]+/mx/repo/?#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/mx/repo/#g' /etc/apt/sources.list.d/mx.list
sudo apt update
```

On antiX, run `repo-manager`, select `Japan, Tsukuba` under `antiX repos`, and click `Apply`.

```console
repo-manager
sudo apt update
```

On an antiX system without a GUI, load the codename from `/etc/os-release` and change the repository with the following commands.

```console
. /etc/os-release
sudo sed -Ei "s#(https?|ftp)://[^[:space:]]+#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/antix/${VERSION_CODENAME}/#g" /etc/apt/sources.list.d/antix.list
sudo apt update
```

To change the Debian repositories as well, follow the Debian instructions above separately.

- References
  - [mx-repo-manager/help/mx-repo-manager.html at master · MX-Linux/mx-repo-manager · GitHub](https://github.com/MX-Linux/mx-repo-manager/blob/master/help/mx-repo-manager.html#LC26)
  - [mx-repo-list/repos.txt at master · MX-Linux/mx-repo-list · GitHub](https://github.com/MX-Linux/mx-repo-list/blob/master/repos.txt#LC59)
  - [antiX-26 Packages – antiX Linux](https://antixlinux.com/antix-26-packages/)

#### Raspberry Pi OS (Raspbian)

On the 32-bit Raspberry Pi OS, edit `/etc/apt/sources.list.d/raspbian.sources` in a typical installation.

```console
sudo sed -Ei 's#https?://raspbian\.raspberrypi\.(com|org)/raspbian#https://ftp.tsukuba.wide.ad.jp/Linux/raspbian/raspbian#g' /etc/apt/sources.list.d/raspbian.sources
sudo apt update
```

When using the traditional format, use the following commands.

```console
sudo sed -Ei 's#https?://raspbian\.raspberrypi\.(com|org)/raspbian#https://ftp.tsukuba.wide.ad.jp/Linux/raspbian/raspbian#g' /etc/apt/sources.list
sudo apt update
```

Follow the Debian instructions above when the 64-bit edition uses Debian repositories.

#### Ubuntu

During installation of the amd64 edition, enter `https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu/` in the installer's “Ubuntu archive mirror” or “Mirror address” field.

On Ubuntu Desktop, open Software & Updates and select Other, Japan, and Tsukuba WIDE under Download from.

On an Ubuntu 24.04 LTS or later system without a GUI, edit `/etc/apt/sources.list.d/ubuntu.sources` in a typical installation. Do not change `security.ubuntu.com`, which provides security updates.

```console
sudo sed -Ei 's|https?://([a-z]{2}\.)?archive\.ubuntu\.com/ubuntu|https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu|g' /etc/apt/sources.list.d/ubuntu.sources
sudo apt update
```

On an Ubuntu 22.04 LTS or earlier system without a GUI that uses the traditional format, use the following commands.

```console
sudo sed -Ei 's|https?://([a-z]{2}\.)?archive\.ubuntu\.com/ubuntu|https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu|g' /etc/apt/sources.list
sudo apt update
```

- References
  - [Repositories/Ubuntu - Community Help Wiki](https://help.ubuntu.com/community/Repositories/Ubuntu#Download_Server)
  - [Tsukuba WIDE : Ubuntu](https://launchpad.net/ubuntu/+mirror/ftp.tsukuba.wide.ad.jp-archive)
