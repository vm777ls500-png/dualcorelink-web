<?php

final class DualCoreLink_Import_Run_Store
{
    private string $root;
    private $lock_handle = null;

    public function __construct(?string $root = null)
    {
        $this->root = $root ?: DualCoreLink_Import_Config::run_root();
    }

    public function root(): string
    {
        return $this->root;
    }

    private function assert_run_id(string $run_id): void
    {
        if (!DualCoreLink_Import_Config::valid_run_id($run_id)) {
            throw new DualCoreLink_Import_Exception(
                'Invalid run ID.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
    }

    private function run_directory(string $run_id): string
    {
        $this->assert_run_id($run_id);
        return $this->root . DIRECTORY_SEPARATOR . $run_id;
    }

    public function exists(string $run_id): bool
    {
        return is_dir($this->run_directory($run_id));
    }

    public function initialize(string $run_id): void
    {
        $directory = $this->run_directory($run_id);
        if (file_exists($directory)) {
            throw new DualCoreLink_Import_Exception(
                'Run ID already exists.',
                DualCoreLink_Import_Config::EXIT_CONFLICT
            );
        }
        if (!is_dir($this->root) && !mkdir($this->root, 0750, true) && !is_dir($this->root)) {
            throw new RuntimeException('Unable to create import run root.');
        }
        @chmod($this->root, 0750);
        if (!mkdir($directory, 0750, false)) {
            throw new RuntimeException('Unable to create import run directory.');
        }
        @chmod($directory, 0750);
    }

    public function acquire_lock(int $timeout_seconds = 10): void
    {
        if (!is_dir($this->root) && !mkdir($this->root, 0750, true) && !is_dir($this->root)) {
            throw new DualCoreLink_Import_Exception(
                'Unable to create lock root.',
                DualCoreLink_Import_Config::EXIT_LOCK
            );
        }
        $handle = fopen($this->root . DIRECTORY_SEPARATOR . '.import.lock', 'c');
        if ($handle === false) {
            throw new DualCoreLink_Import_Exception(
                'Unable to open import lock.',
                DualCoreLink_Import_Config::EXIT_LOCK
            );
        }
        $deadline = microtime(true) + max(0, $timeout_seconds);
        do {
            if (flock($handle, LOCK_EX | LOCK_NB)) {
                $this->lock_handle = $handle;
                return;
            }
            usleep(100000);
        } while (microtime(true) < $deadline);
        fclose($handle);
        throw new DualCoreLink_Import_Exception(
            'Importer lock acquisition timed out.',
            DualCoreLink_Import_Config::EXIT_LOCK
        );
    }

    public function release_lock(): void
    {
        if (is_resource($this->lock_handle)) {
            flock($this->lock_handle, LOCK_UN);
            fclose($this->lock_handle);
        }
        $this->lock_handle = null;
    }

    public function write(string $run_id, string $name, array $value): void
    {
        $allowed = [
            'request.json',
            'preflight.json',
            'pre-image.json',
            'operations.json',
            'verify.json',
            'publish.json',
            'rollback.json',
            'checksums.json',
        ];
        if (!in_array($name, $allowed, true)) {
            throw new DualCoreLink_Import_Exception(
                'Run log filename is not allowed.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        $path = $this->run_directory($run_id) . DIRECTORY_SEPARATOR . $name;
        $temporary = $path . '.tmp-' . bin2hex(random_bytes(8));
        $json = wp_json_encode(
            $value,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
        if (!is_string($json) || file_put_contents($temporary, $json . "\n", LOCK_EX) === false) {
            @unlink($temporary);
            throw new RuntimeException('Unable to write atomic run log.');
        }
        @chmod($temporary, 0600);
        if (!rename($temporary, $path)) {
            @unlink($temporary);
            throw new RuntimeException('Unable to install atomic run log.');
        }
        @chmod($path, 0600);
    }

    public function read(string $run_id, string $name): array
    {
        $path = $this->run_directory($run_id) . DIRECTORY_SEPARATOR . $name;
        if (!is_file($path)) {
            throw new DualCoreLink_Import_Exception(
                'Required run log is missing: ' . $name,
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        $decoded = json_decode((string) file_get_contents($path), true);
        if (!is_array($decoded)) {
            throw new RuntimeException('Run log is not valid JSON: ' . $name);
        }
        return $decoded;
    }

    public function has(string $run_id, string $name): bool
    {
        return is_file($this->run_directory($run_id) . DIRECTORY_SEPARATOR . $name);
    }
}
