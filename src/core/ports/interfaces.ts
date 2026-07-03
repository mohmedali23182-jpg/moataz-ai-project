import { IProviderAdapter } from '@modules/ai-gateway/domain/adapter.interface';
export interface IApiKeyRepository {
  getDecryptedKey(providerId: string): Promise<string | null>;
  listKeys(): Promise<any[]>;
  addKey(providerId: string, name: string, plainValue: string): Promise<any>;
  deleteKey(id: string): Promise<void>;
}

export interface IUsageRepository {
  logUsage(params: {
    requestId: string;
    providerId: string;
    modelId: string;
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
    statusCode: number;
    errorCode?: string;
  }): any;
}

export interface IProviderAdapterRegistry {
  getAdapter(providerId: string): IProviderAdapter | undefined;
}
