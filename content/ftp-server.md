+++
title = "FTPサーバー"

[extra]
toc = true
+++

WIDE つくばNOCでは公開FTPミラーサービスを提供しています。

<img src="/images/ftp-mirror-about.png" alt="ftpミラーサーバの概要" width="65%" />

ドメイン名 : [`ftp.tsukuba.wide.ad.jp`](https://ftp.tsukuba.wide.ad.jp/)

## 使用方法

### OSイメージをダウンロードする

各OSイメージのダウンロード先は次のとおりです。

- AOSC OS (Anthon OS)
  - [ダウンロード先](https://ftp.tsukuba.wide.ad.jp/anthon/)
- Arch Linux
  - [最新版](https://ftp.tsukuba.wide.ad.jp/archlinux/iso/latest/)
- Debian
  - [最新版](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/)
  - [最新版 (x86_64)](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/amd64/iso-cd/)
  - [最新版 (arm64)](https://ftp.tsukuba.wide.ad.jp/debian-cd/current/arm64/iso-cd/)
- Deepin
  - [ダウンロード先](https://ftp.tsukuba.wide.ad.jp/deepin-cd/)
- Mageia
  - [ダウンロード先](https://ftp.tsukuba.wide.ad.jp/mageia/iso/)
- MX Linux / antiX
  - [ダウンロード先](https://ftp.tsukuba.wide.ad.jp/mxlinux-iso/)
- Ubuntu
  - [ダウンロード先](https://ftp.tsukuba.wide.ad.jp/ubuntu-releases/)

### パッケージソフトウェアの参照先として使う

以下は、本サーバーで現在公開している主なパッケージリポジトリの設定方法です。

> **免責事項:** 以下のコマンドは設定例であり、全て確認されたものではありません。本手順の利用によって生じたいかなる損害についても、WIDE つくばNOCは責任を負いません。

#### AOSC OS (Anthon OS)

`oma`でつくばミラーを選択します。設定後のリポジトリ情報の更新も自動的に行われます。

```console
sudo oma mirror set tsukuba
```

古いバージョンの`oma`で`set`が使えない場合は、`sudo oma mirror`を実行し、一覧から`tsukuba`を選択してください。

- 参考資料
  - [aosc-os-repository-data/mirrors.toml at master · AOSC-Dev/aosc-os-repository-data · GitHub](https://github.com/AOSC-Dev/aosc-os-repository-data/blob/master/mirrors.toml#LC100)

#### Arch Linux

`/etc/pacman.d/mirrorlist`に、Arch Linuxへ登録しているつくばミラーのURLを直接設定します。

```console
echo 'Server = http://ftp.tsukuba.wide.ad.jp/Linux/archlinux/$repo/os/$arch' | sudo tee /etc/pacman.d/mirrorlist
sudo pacman -Syu
```

- 参考資料
  - [Arch Linux - ftp.tsukuba.wide.ad.jp - Mirror Details](https://archlinux.org/mirrors/ftp.tsukuba.wide.ad.jp/)

#### CentOS Stream

CentOS Stream 9および10では、標準設定が`metalink`を使用しているため、`dnf config-manager`でBaseOS、AppStream、CRB、extras-commonの`baseurl`を設定します。

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

Debian 13以降では、通常`/etc/apt/sources.list.d/debian.sources`を変更します。セキュリティ更新用の`security.debian.org`は本ミラーの対象外なので変更しません。

```console
sudo sed -Ei 's|https?://deb\.debian\.org/debian|https://ftp.tsukuba.wide.ad.jp/debian|g' /etc/apt/sources.list.d/debian.sources
sudo apt update
```

Debian 12以前で従来形式を使用している場合は、次のコマンドを使用します。

```console
sudo sed -Ei 's|https?://deb\.debian\.org/debian|https://ftp.tsukuba.wide.ad.jp/debian|g' /etc/apt/sources.list
sudo apt update
```

- 参考資料
  - [第9章 Debian システムを最新に保つ](https://www.debian.org/doc/manuals/debian-faq/uptodate.ja.html#aptitude-upgrade)

#### Deepin

コントロールセンターの「更新」から「更新設定」を開き、`Smart Mirror Switch`をオフにして、`Default Mirror Source`から`[JP] Tsukuba WIDE Public Mirror`を選択します。

GUIを利用できないDeepin 20、23、25では、次のコマンドを使用します。

```console
sudo sed -Ei 's|https?://community-packages\.deepin\.com/(deepin/)?|https://ftp.tsukuba.wide.ad.jp/Linux/deepin/|g' /etc/apt/sources.list
sudo apt update
```

- 参考資料
  - [Packages – Deepin Technology Community](https://www.deepin.org/en/mirrors/packages/)

#### Mageia

現在設定されているメディアを削除し、使用中のリリースとアーキテクチャに対応するつくばミラーを追加します。独自に追加したメディアも削除されるため、必要な場合は後から追加し直してください。

```console
sudo urpmi.removemedia -a
sudo urpmi.addmedia --distrib 'https://ftp.tsukuba.wide.ad.jp/mageia/distrib/$RELEASE/$ARCH'
```

- 参考資料
  - [URPMI - Mageia wiki](https://wiki.mageia.org/en/URPMI#Manually_choosing_a_mirror)

#### Manjaro Linux

`pacman-mirrors`でつくばミラーを指定してから、システムを更新します。現在選択しているstable、testing、unstableのブランチは維持されます。

```console
sudo pacman-mirrors --api --url https://ftp.tsukuba.wide.ad.jp/Linux/manjaro/ && sudo pacman -Syu
```

- 参考資料
  - [Pacman-mirrors - Manjaro](https://wiki.manjaro.org/index.php?title=Pacman-mirrors#Available_arguments)

#### MX Linux / antiX

MX Linuxでは`mx-repo-manager`を起動し、`MX repos`で`Japan, Tsukuba`を選択して`Apply`を押します。

```console
mx-repo-manager
sudo apt update
```

GUIを利用できないMX Linux 25以降では、次のコマンドを使用します。

```console
sudo sed -Ei 's#(https?|ftp)://[^[:space:]]+/mx/repo/?#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/mx/repo/#g' /etc/apt/sources.list.d/mx.sources
sudo apt update
```

GUIを利用できないMX Linux 23以前では、次のコマンドを使用します。

```console
sudo sed -Ei 's#(https?|ftp)://[^[:space:]]+/mx/repo/?#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/mx/repo/#g' /etc/apt/sources.list.d/mx.list
sudo apt update
```

antiXでは`repo-manager`を起動し、`antiX repos`で`Japan, Tsukuba`を選択して`Apply`を押します。

```console
repo-manager
sudo apt update
```

GUIを利用できないantiXでは、`/etc/os-release`から使用中のコードネームを取得して変更します。

```console
. /etc/os-release
sudo sed -Ei "s#(https?|ftp)://[^[:space:]]+#https://ftp.tsukuba.wide.ad.jp/Linux/mxlinux/antix/${VERSION_CODENAME}/#g" /etc/apt/sources.list.d/antix.list
sudo apt update
```

Debian本体のリポジトリも変更する場合は、前述のDebian向け手順を別途実行してください。

- 参考資料
  - [mx-repo-manager/help/mx-repo-manager.html at master · MX-Linux/mx-repo-manager · GitHub](https://github.com/MX-Linux/mx-repo-manager/blob/master/help/mx-repo-manager.html#LC26)
  - [mx-repo-list/repos.txt at master · MX-Linux/mx-repo-list · GitHub](https://github.com/MX-Linux/mx-repo-list/blob/master/repos.txt#LC59)
  - [antiX-26 Packages – antiX Linux](https://antixlinux.com/antix-26-packages/)

#### Raspberry Pi OS (Raspbian)

32-bit版のRaspberry Pi OSでは、通常`/etc/apt/sources.list.d/raspbian.sources`を変更します。

```console
sudo sed -Ei 's#https?://raspbian\.raspberrypi\.(com|org)/raspbian#https://ftp.tsukuba.wide.ad.jp/Linux/raspbian/raspbian#g' /etc/apt/sources.list.d/raspbian.sources
sudo apt update
```

従来形式を使用している場合は、次のコマンドを使用します。

```console
sudo sed -Ei 's#https?://raspbian\.raspberrypi\.(com|org)/raspbian#https://ftp.tsukuba.wide.ad.jp/Linux/raspbian/raspbian#g' /etc/apt/sources.list
sudo apt update
```

64-bit版でDebianのリポジトリを使用している場合は、前述のDebian向け手順を使用します。

#### Ubuntu

amd64版の初期インストール時は、インストーラーの「Ubuntu archive mirror」または「Mirror address」に`https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu/`を指定します。

Ubuntu Desktopでは「ソフトウェアとアップデート」を開き、「ダウンロード元」から「その他」→「日本」→「Tsukuba WIDE」を選択します。

GUIを利用できないUbuntu 24.04 LTS以降では、通常`/etc/apt/sources.list.d/ubuntu.sources`を変更します。セキュリティ更新用の`security.ubuntu.com`は変更しません。

```console
sudo sed -Ei 's|https?://([a-z]{2}\.)?archive\.ubuntu\.com/ubuntu|https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu|g' /etc/apt/sources.list.d/ubuntu.sources
sudo apt update
```

GUIを利用できないUbuntu 22.04 LTS以前で従来形式を使用している場合は、次のコマンドを使用します。

```console
sudo sed -Ei 's|https?://([a-z]{2}\.)?archive\.ubuntu\.com/ubuntu|https://ftp.tsukuba.wide.ad.jp/Linux/ubuntu|g' /etc/apt/sources.list
sudo apt update
```

- 参考資料
  - [Repositories/Ubuntu - Community Help Wiki](https://help.ubuntu.com/community/Repositories/Ubuntu#Download_Server)
  - [Tsukuba WIDE : Ubuntu](https://launchpad.net/ubuntu/+mirror/ftp.tsukuba.wide.ad.jp-archive)
