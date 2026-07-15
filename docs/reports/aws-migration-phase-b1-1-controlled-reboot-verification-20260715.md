# AWS Migration Phase B1.1 - Controlled Reboot Verification

Date: 2026-07-15

## Objective

Perform one controlled reboot of the initialized AWS Lightsail server and verify that SSH access, swap, firewall rules, services, local-only MariaDB, and public HTTP recover correctly after boot.

## Server

- Instance: `dualcorelink-production`
- Region: Singapore (`ap-southeast-1`)
- Static IPv4: `52.74.68.63`
- Operating system: Ubuntu 24.04.4 LTS
- Expected hostname: `dualcorelink-production`
- Expected timezone: `Asia/Singapore`

The existing local Lightsail key was used without printing, copying, or recording its path or contents.

## Pre-Reboot Baseline

The server was healthy immediately before the reboot:

- Uptime: approximately 1 hour
- Memory: 3.7 GiB total, approximately 658 MiB used, 3.1 GiB available
- Swap: 2.0 GiB mounted from `/swapfile`, 0 B used
- Root filesystem: 77 GB total, 4.6 GB used, 72 GB available, 7% used
- Failed systemd units: 0
- Public listeners: TCP 22 and TCP 80 on IPv4 and IPv6
- MariaDB listener: `127.0.0.1:3306` only

Commands executed before reboot:

```text
uptime
free -h
df -h /
swapon --show
sudo systemctl --failed --no-pager
sudo ss -tulpn
```

## Controlled Reboot

The reboot was initiated through the existing `deploy` SSH account:

```text
sudo reboot
```

The SSH command returned normally. The server reported a new boot time of `2026-07-15 14:58:20 +08`, confirming that an actual reboot occurred. SSH login recovered within approximately one minute of the new boot.

No stop, terminate, restore, snapshot deletion, or control-plane configuration change was performed.

## SSH Recovery

Fresh key-authenticated SSH sessions succeeded for both required users:

- `ubuntu`: login successful; hostname returned `dualcorelink-production`
- `deploy`: login successful; hostname returned `dualcorelink-production`
- `deploy` non-interactive sudo: successful; effective user was root

No password login or sensitive credential output was used.

## Post-Reboot System Verification

### Identity and Time

- Hostname: `dualcorelink-production`
- Timezone: `Asia/Singapore`
- NTP service: active
- System clock: synchronized
- Kernel: `6.17.0-1010-aws`
- Reboot-required flag: absent

### Memory, Swap, and Disk

- Memory: 3.7 GiB total, approximately 554 MiB used, 3.2 GiB available
- Swap: 2.0 GiB automatically mounted from `/swapfile`
- Swap usage: 0 B
- Root filesystem: 77 GB total, 4.6 GB used, 72 GB available, 7% used

The persistent `/etc/fstab` swap configuration worked as intended.

### Service Recovery

All required services automatically recovered and remained enabled:

| Service | Active | Enabled |
| --- | --- | --- |
| `nginx` | Yes | Yes |
| `mariadb` | Yes | Yes |
| `php8.3-fpm` | Yes | Yes |
| `fail2ban` | Yes | Yes |

Final `systemctl --failed` output contained zero failed units.

### Listener Verification

Post-reboot server listeners were:

- SSH: TCP 22 on IPv4 and IPv6
- Nginx HTTP: TCP 80 on IPv4 and IPv6
- MariaDB: TCP 3306 on `127.0.0.1` only
- Local operating system services: resolver and chrony only

MariaDB did not bind to a public IPv4 or IPv6 address.

### UFW Verification

UFW automatically recovered in active state:

- Logging: enabled at low level
- Default incoming: deny
- Default outgoing: allow
- OpenSSH: TCP 22 allowed
- Nginx Full: TCP 80 and 443 allowed
- MariaDB TCP 3306: no allow rule
- IPv4 and IPv6 rules: present

### External Connectivity

Checks from the local workstation confirmed:

- TCP 22: open
- TCP 80: open
- TCP 443: closed or filtered
- TCP 3306: closed or filtered
- HTTP request to the static IPv4: status 200

TCP 443 remains the previously documented Lightsail network firewall follow-up. It was not changed during this reboot verification.

## Commands Executed After Reboot

```text
hostname
timedatectl
uname -a
uptime
free -h
swapon --show
df -h /
systemctl is-active nginx mariadb php8.3-fpm fail2ban
systemctl is-enabled nginx mariadb php8.3-fpm fail2ban
sudo systemctl --failed --no-pager
sudo ss -tulpn
sudo ufw status verbose
```

External checks used fresh SSH connections for both users, TCP connectivity probes for ports 22, 80, 443, and 3306, and an HTTP HEAD request to the static IPv4.

## Scope Confirmation

- DNS modified: No
- Cloudflare modified: No
- SiteGround modified: No
- WordPress modified: No
- Database data modified: No
- Application deployed: No
- Lightsail firewall modified: No
- Git push performed: No

## Result

Phase B1.1 passed. The controlled reboot completed successfully, both SSH users recovered, the 2 GB swap file mounted automatically, all four required services returned to active and enabled state, MariaDB remained local-only, no failed services were present, public SSH and HTTP were reachable, and HTTP returned status 200.

The only remaining network observation is unchanged from Phase B1: Lightsail TCP 443 must be added in a separately approved phase before HTTPS cutover.
