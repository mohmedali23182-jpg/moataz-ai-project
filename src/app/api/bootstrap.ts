import { ServiceRegistry } from '@core/ports/registry';
import { ApiKeyRepo } from '@modules/api-keys/infrastructure/api-key.repository';
import { UsageRepo } from '@modules/analytics/infrastructure/usage.repository';
import { AdapterRegistry } from '@modules/ai-gateway/infrastructure/adapters';

let bootstrapped = false;

export function ensureBootstrapped() {
  if (bootstrapped) return;
  ServiceRegistry.registerApiKeyRepository(ApiKeyRepo);
  ServiceRegistry.registerUsageRepository(UsageRepo);
  ServiceRegistry.registerAdapterRegistry(AdapterRegistry);
  bootstrapped = true;
}
