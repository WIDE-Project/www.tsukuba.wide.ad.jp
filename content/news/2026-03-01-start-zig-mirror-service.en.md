+++
title = "Zig language mirror service started (beta)"
date = 2025-03-01
+++

WIDE Tsukuba NOC started a beta mirror service for the Zig language ([https://ziglang.org/](https://ziglang.org/)) on 2026/02/27.

Also, since 2026/02/29, this mirror service has been officially listed and is actually referenced by various Zig tools. (Reference: [https://github.com/ziglang/www.ziglang.org/pull/590](https://github.com/ziglang/www.ziglang.org/pull/590))

For more details, please refer to the [Zig community mirror service page](/en/zig-mirror).

## Why this service matters

The Zig Software Foundation, which operates the Zig language project, announced a migration from AWS binary hosting to self-hosting due to rising costs: [Migrating to Self-Hosting: Why We Did It and How](https://ziglang.org/news/migrate-to-self-hosting/).

However, that environment appears to have a drawback: download speeds from Japan are very slow. A simple DNS lookup for `ziglang.org` suggests the server is hosted in Germany by [Hetzner](https://www.hetzner.com/), and latency from Japan is on the order of a few hundred milliseconds.

For at least automated tooling, Zig strongly recommends using community mirrors with signature verification. Hosting community mirror servers is also encouraged.

The list of community mirrors is available at [https://ziglang.org/download/community-mirrors.txt](https://ziglang.org/download/community-mirrors.txt), but many entries appear to be private CDN/rental hosts or home-server-like environments, and because many are run by individuals, mirror availability seems to fluctuate significantly.

Also, in practice, mirrors are often selected randomly from `community-mirrors.txt`, and there is no global load-balancing layer such as one built with [mirrorbits](https://github.com/videolabs/mirrorbits). As a result, downloads from outside Japan can in some cases become slower rather than faster. Actual behavior also depends on each client implementation. WIDE Project has relatively strong international connectivity, so we still expect some practical benefit, but we hope ZSF will eventually provide or encourage region-aware selection and a mirrorbits-like global load-balancing mechanism.

Even with these limitations, by joining this ecosystem, WIDE Tsukuba NOC can offer a certain level of continuity[^1] and provide a high-speed mirror backed by the WIDE Project backbone. We believe this can contribute, however modestly, to the future growth of the Zig language.

## Why it is separate from our FTP service

Ideally, this kind of mirror service would be provided through our existing [FTP mirror server](/en/ftp-server). However, this service has special requirements, such as per-build mirroring and parsing request paths to construct upstream (`ziglang.org`) URLs, so we publish it as an independent service.

In practice, "proxy" is more accurate than "mirror." The response to the first request can take a very long time[^2], but subsequent requests become faster by using cached data.

[^1]: This does not guarantee anything.

[^2]: It can take around three minutes.
