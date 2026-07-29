<?php

final class DualCoreLink_Multilingual_Import_CLI_Command
{
    private function service(): DualCoreLink_Multilingual_Import_Service
    {
        return new DualCoreLink_Multilingual_Import_Service(
            new DualCoreLink_WordPress_Import_Repository(),
            new DualCoreLink_Import_Run_Store()
        );
    }

    private function value(array $assoc_args, string $key, string $default = ''): string
    {
        $value = $assoc_args[$key] ?? $default;
        return is_scalar($value) ? (string) $value : $default;
    }

    private function output(array $result, array $assoc_args): void
    {
        if ($this->value($assoc_args, 'format', 'json') !== 'json') {
            throw new DualCoreLink_Import_Exception(
                'Only --format=json is supported.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        WP_CLI::line((string) wp_json_encode(
            $result,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        ));
    }

    private function fail(Throwable $throwable): void
    {
        $message = preg_replace(
            '/(password|token|secret|cookie|authorization)\s*[:=]\s*\S+/i',
            '$1=[REDACTED]',
            $throwable->getMessage()
        );
        $code = $throwable instanceof DualCoreLink_Import_Exception
            ? $throwable->import_exit_code()
            : DualCoreLink_Import_Config::EXIT_SAFETY;
        WP_CLI::warning(is_string($message) ? $message : 'Import command failed.');
        WP_CLI::halt($code);
    }

    /**
     * Read-only validation of the exact Chinese P0 payload.
     */
    public function preflight(array $args, array $assoc_args): void
    {
        try {
            $payload = DualCoreLink_Multilingual_Import_Service::load_payload(
                $this->value($assoc_args, 'file')
            );
            $result = $this->service()->preflight(
                $payload,
                $this->value($assoc_args, 'locale'),
                $this->value($assoc_args, 'batch')
            );
            unset($result['mapped'], $result['source_hashes']);
            $this->output($result, $assoc_args);
        } catch (Throwable $throwable) {
            $this->fail($throwable);
        }
    }

    /**
     * Apply the verified batch as drafts only.
     */
    public function apply(array $args, array $assoc_args): void
    {
        try {
            $payload = DualCoreLink_Multilingual_Import_Service::load_payload(
                $this->value($assoc_args, 'file')
            );
            $result = $this->service()->apply(
                $payload,
                $this->value($assoc_args, 'locale'),
                $this->value($assoc_args, 'batch'),
                $this->value($assoc_args, 'status'),
                $this->value($assoc_args, 'run-id'),
                $this->value($assoc_args, 'confirm-run-id'),
                array_key_exists('allow-update', $assoc_args)
            );
            $this->output($result, $assoc_args);
        } catch (Throwable $throwable) {
            $this->fail($throwable);
        }
    }

    /**
     * Re-read and verify a completed draft run.
     */
    public function verify(array $args, array $assoc_args): void
    {
        try {
            $result = $this->service()->verify($this->value($assoc_args, 'run-id'));
            $this->output($result, $assoc_args);
        } catch (Throwable $throwable) {
            $this->fail($throwable);
        }
    }

    /**
     * Publish only the seven verified records owned by a run.
     */
    public function publish(array $args, array $assoc_args): void
    {
        try {
            $result = $this->service()->publish(
                $this->value($assoc_args, 'run-id'),
                $this->value($assoc_args, 'confirm-run-id')
            );
            $this->output($result, $assoc_args);
        } catch (Throwable $throwable) {
            $this->fail($throwable);
        }
    }

    /**
     * Restore updated records and return created records to draft.
     */
    public function rollback(array $args, array $assoc_args): void
    {
        try {
            $result = $this->service()->rollback(
                $this->value($assoc_args, 'run-id'),
                $this->value($assoc_args, 'confirm-run-id')
            );
            $this->output($result, $assoc_args);
        } catch (Throwable $throwable) {
            $this->fail($throwable);
        }
    }
}
