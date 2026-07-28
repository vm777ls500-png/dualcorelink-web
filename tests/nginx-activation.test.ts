import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();
const workflowPath = path.join(
  projectRoot,
  ".github",
  "workflows",
  "aws-production-deploy.yml",
);
const helperPath = path.join(
  projectRoot,
  "deploy",
  "scripts",
  "activate-nginx-site-root.sh",
);

test("AWS deployment activates the versioned Nginx site after the static release", async () => {
  const workflow = await readFile(workflowPath, "utf8");
  const deployStep = workflow.indexOf("- name: Deploy atomic release");
  const activationStep = workflow.indexOf(
    "- name: Activate versioned Nginx site configuration",
  );
  const redirectStep = workflow.indexOf(
    "- name: Verify exact production redirects",
  );
  const finalStep = workflow.indexOf(
    "- name: Verify test-domain indexing protection",
  );

  assert.ok(deployStep >= 0);
  assert.ok(activationStep > deployStep);
  assert.ok(redirectStep > activationStep);
  assert.ok(finalStep > redirectStep);
  assert.match(workflow, /bash -n "\$repository_helper"/);
  assert.match(
    workflow,
    /installed_helper_metadata=.*stat -c '%U:%G %a' "\$installed_helper"/,
  );
  assert.match(workflow, /"\$installed_helper_metadata" != "root:root 755"/);
  assert.match(
    workflow,
    /repository_helper_hash=.*sha256sum "\$repository_helper"/,
  );
  assert.match(
    workflow,
    /installed_helper_hash=.*sha256sum "\$installed_helper"/,
  );
  assert.match(
    workflow,
    /sudo -n "\$installed_helper" "\$GITHUB_WORKSPACE" "\$GITHUB_SHA"/,
  );
  assert.doesNotMatch(
    workflow,
    /sudo -n (?:cp|install|mv|nginx|systemctl)\b/,
  );
});

test("production redirect verification requires an exact one-hop 301 and 200 target", async () => {
  const workflow = await readFile(workflowPath, "utf8");
  const redirectPairs = [
    [
      "https://dualcorelink.com/solutions/oem-odm-custom-panel-solution/",
      "https://dualcorelink.com/en/solutions/oem-odm-custom-panel-solution/",
    ],
    [
      "https://dualcorelink.com/resources/hotel-rcu-wiring-system-architecture-guide/",
      "https://dualcorelink.com/en/resources/hotel-rcu-wiring-system-architecture-guide/",
    ],
  ];

  assert.match(workflow, /--max-redirs 0 "\$source_url"/);
  assert.match(
    workflow,
    /\[\[ "\$status" != "301" \|\| "\$location" != "\$target_url" \]\]/,
  );
  assert.match(workflow, /--location --max-redirs 1 "\$source_url"/);
  assert.match(
    workflow,
    /\[\[ "\$final_result" != "200 \$target_url 1" \]\]/,
  );

  for (const [source, target] of redirectPairs) {
    assert.match(workflow, new RegExp(escapeRegExp(source)));
    assert.match(workflow, new RegExp(escapeRegExp(target)));
  }
});

test("root helper is restricted to the committed DualCoreLink site configuration", async () => {
  const helper = await readFile(helperPath, "utf8");

  assert.match(helper, /if \[\[ "\$\{EUID\}" -ne 0 \]\]/);
  assert.match(helper, /if \[\[ "\$#" -ne 2 \]\]/);
  assert.match(helper, /source SHA must be a full 40-character commit SHA/);
  assert.match(helper, /rev-parse --verify HEAD/);
  assert.match(
    helper,
    /diff --quiet "\$source_sha" -- "\$relative_candidate"/,
  );
  assert.match(
    helper,
    /relative_candidate="deploy\/nginx\/dualcorelink\.com\.conf\.template"/,
  );
  assert.match(
    helper,
    /live_site="\/etc\/nginx\/sites-available\/\$\{site_name\}"/,
  );
  assert.match(
    helper,
    /enabled_site="\/etc\/nginx\/sites-enabled\/\$\{site_name\}"/,
  );
  assert.match(helper, /enabled site does not resolve to the approved live site/);
  assert.match(
    helper,
    /current static release is outside the approved release root/,
  );
  assert.doesNotMatch(helper, /usage:.*destination/);
});

test("root helper backs up, atomically installs, validates, reloads, and restores", async () => {
  const helper = await readFile(helperPath, "utf8");
  const backupIndex = helper.indexOf('/usr/bin/cp -a -- "$live_site" "$backup"');
  const installIndex = helper.indexOf(
    '/usr/bin/install -o root -g root -m 0644 -- "$candidate" "$candidate_temp"',
  );
  const replaceIndex = helper.indexOf(
    '/usr/bin/mv -fT -- "$candidate_temp" "$live_site"',
  );
  const validateIndex = helper.indexOf('if ! "$nginx_bin" -t');
  const reloadIndex = helper.indexOf(
    'if ! "$systemctl_bin" reload nginx',
  );

  assert.ok(backupIndex >= 0);
  assert.ok(installIndex > backupIndex);
  assert.ok(replaceIndex > installIndex);
  assert.ok(validateIndex > replaceIndex);
  assert.ok(reloadIndex > validateIndex);
  assert.match(helper, /restore_previous "nginx -t rejected/);
  assert.match(helper, /restore_previous "Nginx reload failed"/);
  assert.match(helper, /--resolve dualcorelink\.com:443:127\.0\.0\.1/);
  assert.match(helper, /local verification rejected the OEM\/ODM solution/);
  assert.match(helper, /local verification rejected the RCU wiring resource/);
  assert.match(
    helper,
    /install -o root -g root -m 0644 -- "\$backup" "\$restore_temp"/,
  );
  assert.match(helper, /nginx_config_changed=no/);
  assert.match(helper, /nginx_config_changed=yes/);
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
