# AWS Migration Phase B1 - Lightsail Server Initialization

Date: 2026-07-15

## Objective

Initialize the new DualCoreLink AWS Lightsail server with an updated Ubuntu base, a dedicated deployment user, a small production software baseline, local-only MariaDB, host firewall rules, swap, and empty deployment directories. This phase did not deploy or migrate any application data.

## Instance Baseline

- Instance: `dualcorelink-production`
- Region: Singapore (`ap-southeast-1`)
- Static IPv4: `52.74.68.63`
- Plan: 2 vCPU, 4 GB RAM, 80 GB SSD
- Operating system: Ubuntu 24.04.4 LTS
- Kernel: Linux `6.17.0-1010-aws`, x86_64
- Initial hostname: AWS-generated private hostname
- Final hostname: `dualcorelink-production`
- Initial timezone: UTC
- Final timezone: `Asia/Singapore`
- NTP: active and synchronized
- Initial root filesystem: 77 GB usable, approximately 1.9 GB used
- Initial swap: none
- Initial failed systemd units: 0
- Initial public listeners: SSH on TCP 22 only

SSH authentication used the existing local Lightsail Singapore key. The key was not copied into the repository, printed, committed, or included in this report. Its local Windows ACL was restricted before use because OpenSSH rejected the original permissive ACL.

## System Update

The package index and installed packages were updated without changing the Ubuntu major version:

```text
sudo apt-get update
sudo env DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
```

The upgrade updated 107 packages. Four kernel or firmware metapackages remain available for a later maintenance window: `fwupd`, `linux-aws`, `linux-headers-aws`, and `linux-image-aws`.

The server currently reports that a reboot is required. No reboot was performed in this phase, as required.

## Hostname and Timezone

Commands used:

```text
sudo hostnamectl set-hostname dualcorelink-production
sudo timedatectl set-timezone Asia/Singapore
hostnamectl
timedatectl
```

Verification confirmed the requested hostname, Singapore time, synchronized system clock, and active NTP.

## Swap Configuration

A 2 GB `/swapfile` was created and enabled:

- Size: 2 GB
- Permissions: `0600`
- Persistent entry: `/swapfile none swap sw 0 0`
- Swappiness: `10`, persisted in `/etc/sysctl.d/99-dualcorelink-swap.conf`
- Final usage: 0 B used during verification

Commands used included `fallocate`, `chmod`, `mkswap`, `swapon`, an idempotent `/etc/fstab` update, and `sysctl --system`.

## Deployment User

The `deploy` user was created with:

- Home directory: `/home/deploy`
- Shell: Bash
- Group membership: `deploy`, `sudo`
- Password state: locked; password SSH login is not available
- SSH authorization: copied from the existing `ubuntu` public authorized key list
- Home permissions: `0750`
- `.ssh` permissions: `0700`
- `authorized_keys` permissions: `0600`
- Sudo policy: passwordless sudo through `/etc/sudoers.d/deploy`, validated with `visudo`

A new external SSH session verified `deploy` key authentication and non-interactive sudo access. The original `ubuntu` user was retained. Effective SSH daemon settings report public-key authentication enabled and password authentication disabled.

## Installed Software

Only the requested base packages were installed:

- Nginx
- MariaDB Server
- PHP-FPM and PHP CLI
- PHP extensions: MySQL, cURL, GD, mbstring, XML, ZIP, Intl, BCMath, Imagick
- unzip, zip, curl, wget, git, rsync, jq
- fail2ban, UFW, CA certificates, GnuPG

Key verified versions:

- PHP CLI: 8.3.6
- PHP-FPM service: `php8.3-fpm.service`
- MariaDB: 10.11.14
- Git: 2.43.0
- cURL: 8.5.0

WordPress, Node.js, Certbot, GitHub Runner, phpMyAdmin, and additional application dependencies were not installed.

## Service Status

The following services are enabled at boot and active:

| Service | Enabled | Active |
| --- | --- | --- |
| `nginx` | Yes | Yes |
| `mariadb` | Yes | Yes |
| `php8.3-fpm` | Yes | Yes |
| `fail2ban` | Yes | Yes |

Fail2ban has one active jail: `sshd`. Final `systemctl --failed` output contained zero failed units. `nginx -t` completed successfully.

## MariaDB Security Baseline

MariaDB was secured without creating the production WordPress database or application user:

- Listener: `127.0.0.1:3306` only
- Configuration: `bind-address = 127.0.0.1`
- Local Unix socket administration: retained and verified
- Anonymous users: 0
- Remote root users: 0
- Test databases: 0
- Test database grants: removed
- Unauthenticated TCP root access: blocked
- Public TCP 3306 reachability: closed or filtered

No database password is recorded in this report, and no MariaDB firewall rule was added.

## Firewall

### UFW

UFW was configured and enabled after the OpenSSH rule was added:

- Default incoming: deny
- Default outgoing: allow
- Allowed: OpenSSH, TCP 22
- Allowed: Nginx Full, TCP 80 and 443
- MariaDB TCP 3306: not allowed
- Logging: enabled at low level
- IPv4 and IPv6 rules: present

The original SSH session remained connected and a fresh `deploy` SSH session succeeded after UFW activation.

### Lightsail Network Firewall

The AWS Lightsail console was checked read-only. Its IPv4 and IPv6 firewalls currently allow:

- TCP 22 from any address
- TCP 80 from any address

TCP 443 is not currently present in either Lightsail firewall rule set. Per phase restrictions, the AWS firewall was not modified. External checks confirmed TCP 22 and 80 are reachable, while TCP 443 and 3306 are closed or filtered. HTTP on the static IPv4 returned status 200.

The missing Lightsail TCP 443 rule is an explicit blocker for a future HTTPS cutover and must be added in a later approved phase.

## Directory Baseline

The following empty directories were created:

```text
/srv/dualcorelink
/srv/dualcorelink/frontend
/srv/dualcorelink/releases
/srv/dualcorelink/shared
/srv/dualcorelink/backups
/srv/dualcorelink/wordpress
/var/www/dualcorelink
/var/www/cms.dualcorelink.com
```

They are owned by `deploy:www-data`. General deployment and web directories use setgid mode `2775`; the backup directory uses the more restrictive setgid mode `2750`. No project, WordPress, database, or media content was placed in them.

## Final Resource and Listener Verification

- RAM: 3.7 GiB total, approximately 661 MiB used, 3.1 GiB available
- Swap: 2.0 GiB total, 0 B used
- Root filesystem: 77 GB total, 4.6 GB used, 72 GB available, 7% used
- Failed systemd units: 0
- Public TCP listeners: 22 and 80 on IPv4 and IPv6
- Local-only TCP listener: MariaDB on `127.0.0.1:3306`
- Local system listeners: system resolver and chrony
- TCP 443: permitted by UFW but not yet served by Nginx and not permitted by the Lightsail network firewall

## Commands Executed

The command groups executed during this phase were:

```text
whoami
hostname
cat /etc/os-release
uname -a
free -h
df -h
lsblk
ip addr
timedatectl
sudo systemctl --failed
sudo ss -tulpn

sudo apt-get update
sudo env DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
sudo hostnamectl set-hostname dualcorelink-production
sudo timedatectl set-timezone Asia/Singapore

sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo sysctl --system

sudo useradd --create-home --shell /bin/bash deploy
sudo usermod -aG sudo deploy
sudo passwd -l deploy
sudo visudo -cf /etc/sudoers.d/deploy

sudo env DEBIAN_FRONTEND=noninteractive apt-get install -y <requested-base-packages>
sudo systemctl enable --now nginx mariadb php8.3-fpm fail2ban

sudo mariadb <local-security-statements>
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

sudo install -d <requested-directory-baseline>
sudo nginx -t
php -v
mariadb --version
git --version
curl --version
sudo systemctl --failed
sudo ss -tulpn
sudo ufw status verbose
free -h
df -h
swapon --show
```

Sensitive SSH arguments, authorized key contents, and database security statement details are intentionally omitted.

## Not Performed

- No Cloudflare DNS or production domain changes
- No SiteGround changes
- No WordPress installation or data modification
- No database or uploads import
- No production database or database user creation
- No project clone or website deployment
- No Node.js, Certbot, GitHub Runner, or phpMyAdmin installation
- No MariaDB 3306 exposure
- No Lightsail firewall mutation
- No instance stop, delete, snapshot delete, or reboot
- No private key, password, token, or full authorized key saved in Git

## Risks and Observations

1. The server reports that a reboot is required after system package upgrades. Schedule a controlled reboot and post-reboot service/SSH validation before application deployment.
2. The Lightsail network firewall lacks TCP 443 for both IPv4 and IPv6. Add only the approved HTTPS rule before TLS deployment or domain cutover.
3. Four kernel or firmware metapackages remain available. Review and apply them during the same controlled maintenance window, then reboot if required.
4. Nginx currently serves its default HTTP page. TLS, virtual hosts, application content, and certificates are intentionally deferred.

## Result

Phase B1 server initialization completed successfully with two deferred infrastructure actions: the controlled reboot and the Lightsail TCP 443 rule. The host is reachable by SSH, HTTP returns 200, requested services are active, MariaDB is local-only, UFW is enforced, swap is persistent, and no application migration or production cutover occurred.
